const { v4: uuidv4 } = require("uuid");

const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    username: "test",
    email: "test@test.com",
    password: "password",
  },
  {
    id: "u2",
    username: "testmon",
    email: "tester@test.com",
    password: "password",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const user = DUMMY_USERS.find((u) => u.email === email);
  if (!user || user.password !== password) {
    throw new HttpError("Could not login, credentials inncorrect.", 401);
  }

  res.json({ message: "logged in." });
};

const register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed. please check your data", 422);
  }
  const { username, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    throw new HttpError(`User with email: ${email} already exists!`, 422);
  }
  const registeredUser = {
    id: uuidv4(),
    username,
    email,
    password,
  };

  DUMMY_USERS.push(registeredUser);
  res.status(201).json({ user: registeredUser });
};

exports.getUsers = getUsers;
exports.login = login;
exports.register = register;
