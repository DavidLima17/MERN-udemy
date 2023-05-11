import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import PlaceList from "../components/PlaceList";

// place holder for frontend testing since we have no backend yet.
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "The largest building in the united states.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St., New York, NY 10001",
    location: {
      lat: 41.1939142,
      lng: -76.0429455,
    },
    creator: 'u1',
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "The largest building in the united states.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St., New York, NY 10001",
    location: {
      lat: 41.1939142,
      lng: -76.0429455,
    },
    creator: 'u2'
  },
];
const UserPlaces = () => {
  const uid = useParams().uid;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === uid);
  return <PlaceList items={loadedPlaces}/>;
};

export default UserPlaces;
