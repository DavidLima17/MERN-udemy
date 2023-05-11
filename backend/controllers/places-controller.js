const { v4: uuidv4 } = require("uuid");

const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");

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
const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place with the provided id", 404);
  }
  res.json({ place });
};

// http GET 'api/places/user/:uid' gets a user's place
const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((u) => {
    return u.creator === userId;
  });
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a place with the provided id", 404)
    );
  }
  res.json({ places });
};

// http POST 'api/places/' creates a new post
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
     return next(new HttpError("Invalid inputs passed. please check your data", 422));
  }

  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);
  //   DUMMY_PLACES.unshift(createPlace); if we wanted to create it without appending to the array
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
