// const { v4: uuidv4 } = require("uuid");

const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "The largest building in the united states.",
    address: "20 W 34th St., New York, NY 10001",
    location: {
      lat: 41.1939142,
      lng: -76.0429455,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "The largest building in the united states.",
    address: "20 W 34th St., New York, NY 10001",
    location: {
      lat: 41.1939142,
      lng: -76.0429455,
    },
    creator: "u1",
  },
  {
    id: "p3",
    title: "Empire State Building",
    description: "The largest building in the united states.",
    address: "20 W 34th St., New York, NY 10001",
    location: {
      lat: 41.1939142,
      lng: -76.0429455,
    },
    creator: "u2",
  },
];

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

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find user places.",
      500
    );
    return next(err);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a place with the provided id", 404)
    );
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
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

  const { title, description, address, creator } = req.body;
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
    image: "./somepath.png",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }
  // DUMMY_PLACES.push(createdPlace);
  // DUMMY_PLACES.unshift(createPlace); if we wanted to create it without appending to the array
  res.status(201).json({ place: createdPlace });
};

// http PATCH 'api/places/:pid' updates an existing place
const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed. please check your data", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
  //   imporper way to update, standard is to clone and object and then update it after
  //   const place = DUMMY_PLACES.find((p) => {
  //     return p.id === placeId;
  //   });
  //   if (place) {
  //     place.title = title;
  //     place.description = description;
  //   }
  //   res.status(201).json({ place });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find the place you were looking for.", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Place Deleted successfully." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
