import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchComponent from "../components/SearchComponent";
import UserCard from "../components/UserCard";
import UserDetails from "../components/UserDetails";
import { BASE_URL } from "../services/api";

const Dashboard = () => {
  const [allUser, setAllUser] = useState([]);
  const token = localStorage.getItem("token");
  const [searchText, setSearchText] = useState("");
  const allUsers = async () => {
    const users = await axios.get(
      BASE_URL + `user/users?filter=${searchText}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setAllUser(users.data.users);
  };
  useEffect(() => {
    allUsers();
  }, [searchText]);
  return (
    <div className="px-2">
      <UserDetails />
      <SearchComponent
        searchText={searchText}
        setSearchText={setSearchText}
        allUsers={allUsers}
      />
      {allUser.map((user) => {
        return (
          <UserCard
            key={user._id}
            userId={user._id}
            userName={user.firstName}
            icon={user.userName}
          />
        );
      })}
    </div>
  );
};

export default Dashboard;
