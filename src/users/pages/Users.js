import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "David Lima",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3GFc0cf2mFJp4bKjkhZm9xQZyez6D_t12mA&usqp=CAU",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
