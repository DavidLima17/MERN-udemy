const express = require("express");

const router = express.Router();

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

router.get("/", (req, res, next) => {
  console.log("GET Request in Places");
  res.json({ message: "it works.." });
});

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((u) => {
    return u.creator === userId;
  });
  res.json({place});
});

module.exports = router;
