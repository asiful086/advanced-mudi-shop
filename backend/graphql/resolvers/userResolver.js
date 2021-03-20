const crypto = require("crypto");
const { UserInputError } = require("apollo-server-express");
const User = require("../../models/userModel");
const sendEmail = require("../../utils/sendEmail");
const {
  validateRegisterInput,
  validateLoginInput,
  validateForgotPasswordInput,
  validateResetPasswordInput,
} = require("../../validors/userValidator");
const { isAdmin } = require("../../utils/checkAuth");

module.exports = {
  Query: {
    async getUsers(_, __, context) {
      // 1. check auth
      const user = isAdmin(context);
      try {
        const users = await User.find({ _id: { $nin: [user.id] } });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // ==============================================  LOGIN  =========================>
    async login(_, { loginInput: { email, password } }) {
      // 1. validate user
      const { errors, valid } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 2. make sure user  exists
      const user = await User.findOne({ email });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      // 3. Check that password match
      const match = await user.matchPassword(password);
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors });
      }

      // 4. make token and return with that user
      const token = user.getSignedJwtToken();
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    // ==============================================  REGISTER  ======================>

    async register(
      _,
      { registerInput: { name, email, password, confirmPassword } }
    ) {
      // 1. validate user data
      const { valid, errors } = validateRegisterInput(
        name,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 2. make sure user doesnot exists
      const user = await User.findOne({ email });

      if (user) {
        throw new UserInputError("Errors", {
          errors: {
            email: "This email is taken",
          },
        });
      }

      // 4. create a new user
      const newUser = new User({
        name,
        email,
        password,
      });
      const res = await newUser.save();

      // 5. make token and return with that user
      const token = res.getSignedJwtToken();
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    // ==============================================  FORGOT PASSWORD  ===============>

    async forgotPassword(_, { email }) {
      // 1. validate user data
      const { valid, errors } = validateForgotPasswordInput(email);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 2. make sure user does exist
      const user = await User.findOne({ email });

      if (!user) {
        throw new UserInputError("Errors", {
          errors: {
            name: "Email could not be sent",
          },
        });
      }

      // 3. Reset Token Gen and add to database hashed (private) version of token
      const resetToken = user.getResetPasswordToken();

      await user.save();

      // Create reset url to email to provided email
      const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
      // HTML Message
      const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

      try {
        await sendEmail({
          to: user.email,
          subject: "Password Reset Request",
          text: message,
        });
        return "Email Sent";

        // res.status(200).json({ success: true, data: "Email Sent" });
      } catch (err) {
        console.log(err);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        throw new UserInputError("Errors", {
          errors: {
            name: "Email could not be sent",
          },
        });
      }
    },
    // ==============================================  RESET PASSWORD  ================>

    async resetPassword(
      _,
      { input: { resetToken, password, confirmPassword } }
    ) {
      // 1. validate user data
      const { valid, errors } = validateResetPasswordInput(
        resetToken,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Compare token in URL params to hashed token
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        throw new UserInputError("Errors", {
          errors: {
            invalidToken: "Invalid Token",
          },
        });
      }

      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      const res = await user.save();

      // 5. make token and return with that user
      const token = res.getSignedJwtToken();
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
