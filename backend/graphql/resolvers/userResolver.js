const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server-express");
const User = require("../../models/userModel");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../validors/userValidator");

// generate token for jwt
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // ==============================================  LOGIN  =============>
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
      // 3. compare password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors });
      }
      // 4. make token and return with that user
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    // ==============================================  REGISTER  =============>

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
      const user = await User.findOne({ name });

      if (user) {
        throw new UserInputError("User name is taken", {
          errors: {
            name: "This name is taken",
          },
        });
      }

      // 3. has the password  and create an auth token
      password = await bcrypt.hash(password, 12);

      // 4. create a new user
      const newUser = new User({
        email,
        name,
        password,
      });
      const res = await newUser.save();

      // 5. make token and return with that user
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
