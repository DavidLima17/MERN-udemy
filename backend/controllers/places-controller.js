const HttpError = require("../models/http-error");
const { v4: uuidv4} = require('uuid');

const DUMMY_PLACES = [
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

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((u) => {
    return u.creator === userId;
  });
  if (!place) {
    return next(
      new HttpError("Could not find a place with the provided id", 404)
    );
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
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
  res.status(201).json({place: createdPlace});
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
