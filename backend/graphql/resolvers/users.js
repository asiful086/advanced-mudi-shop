const User = require("../../models/userModel");

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
    async register(
      _,
      { registerInput: { name, email, password, confirmPassword } }
    ) {
      console.log(name, email, password);

      const newUser = new User({
        email,
        name,
        password,
      });
      const res = await newUser.save();
      return res._doc;
    },
  },
};
