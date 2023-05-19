const fs = require("fs");

const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");

// http GET 'api/places/:pid' gets a place by id
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError(
      "something went wrong, could not retrieve place.",
      500
    );
    return next(err);
  }
  if (!place) {
    const error = new HttpError(
      "Could not find a place with the provided id",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

// http GET 'api/places/user/:uid' gets a user's place
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find user places.",
      500
    );
    return next(err);
  }

  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(
      new HttpError("Could not find a place with the provided id", 404)
    );
  }
  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

// http POST 'api/places/' creates a new post
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed. please check your data", 422)
    );
  }

  const { title, description, address } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (error) {
    console.log(error);
    return next(new HttpError("could not add uer to place.", 500));
  }

  if (!user) {
    return next(new HttpError("We could not find user for provided id.", 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session: session });
    user.places.push(createdPlace);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

// http PATCH 'api/places/:pid' updates an existing place
const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed. please check your data", 422)
    );
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not retirieve place.", 500)
    );
  }

  if (place.creator.toString() !== req.userData.userId) {
    return next(
      new HttpError("You're not Authorized to edit or delete this place.", 401)
    );
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, could not update place.", 500)
    );
  }
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

// http DELETE 'api/places/:pid' deletes an existing place
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong could not find place.", 500)
    );
  }

  if (!place) {
    return next(new HttpError("Could not find place for this id.", 404));
  }

  if (place.creator.id !== req.userData.userId) {
    return next(
      new HttpError("You're not Authorized to edit or delete this place.", 401)
    );
  }
  const imagePath = place.image;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await place.deleteOne({ session: session });
    place.creator.places.pull(place);
    await place.creator.save({ session: session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong could not delete place.", 500)
    );
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Place Deleted successfully." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
