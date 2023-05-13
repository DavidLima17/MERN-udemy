const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    console.log(error);
    return next(new HttpError("Could not retrieve users.", 500));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Signup failed, please try again later.", 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError("Could not log you in.", 401));
  }
  res.json({ message: "logged in." });
};

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed. please check your data", 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Signup failed, please try again later.", 500));
  }

  if (existingUser) {
    return next(
      new HttpError("Email already exists, please login instead.", 422)
    );
  }
  const registeredUser = new User({
    name,
    email,
    password,
    image: "./some_avatar.png",
    places: [],
  });

  try {
    await registeredUser.save();
  } catch (error) {
    console.log(error);
    return next(
      new HttpError(
        "Could not complete registration, please try again later.",
        500
      )
    );
  }
  res.status(201).json({ user: registeredUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.login = login;
exports.register = register;
