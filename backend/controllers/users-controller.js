const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

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

  if (!existingUser) {
    return next(new HttpError("Could not log you in.", 401));
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(
      new HttpError(
        "Could not log you in, please check your credentials and try again.",
        500
      )
    );
  }

  if (!isValidPassword) {
    return next(new HttpError("Could not log you in.", 403));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError(
        "Could not complete registration, please try again later.",
        500
      )
    );
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }

  const registeredUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
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

  let token;

  try {
    token = jwt.sign(
      {
        userId: registeredUser.id,
        email: registeredUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError(
        "Could not complete registration, please try again later.",
        500
      )
    );
  }

  res.status(201).json({
    userId: registeredUser.id,
    email: registeredUser.email,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.login = login;
exports.register = register;
