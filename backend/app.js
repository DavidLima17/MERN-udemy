const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes.js");
const usersRoutes = require("./routes/users-routes.js");
const HttpError = require("./models/http-error.js");

const PASSWORD = "w6JAWQu9Tumm0Uff";
const url = `mongodb+srv://davidlima17:${PASSWORD}@cluster0.dxf7aoh.mongodb.net/places?retryWrites=true&w=majority`;
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkown error occurred!" });
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
