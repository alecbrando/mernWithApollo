import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "apollo-server";
const { UserInputError } = pkg;
import config from "../../config.js";
const { SECRET_KEY } = config;

export default {
  Mutation: {
    async register(
      parent,
      { registerInput: { username, email, password, confirmedPassword } }
    ) {
      //TODO: Validate user data
      //TODO: Make sure uer doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is already taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      //TODO: hash password and create an auth token
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = jwt.sign(
        {
          id: res._id,
          email: res._email,
          username: res._username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      return { ...res._doc, id: res._id, token };
    },
  },
};
