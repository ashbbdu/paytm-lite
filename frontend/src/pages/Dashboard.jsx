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


  const [userBalance , setUserBalace] = useState(0);
  const getUserBalance = async () => {
      const balance = await axios.get(BASE_URL + "bank/balance" , {headers : {"Authorization" : `Bearer ${token}`}})
      setUserBalace(balance.data.balance)
  }
  useEffect(() => {
     getUserBalance();
  } ,[])

  return (
    <div className="px-2">
      <UserDetails  userBalance={userBalance} />
      <SearchComponent
        searchText={searchText}
        setSearchText={setSearchText}
        allUsers={allUsers}
      />
  
      {allUser.length > 0 ?  allUser.map((user) => {
        return (
          <UserCard
            getUserBalance={getUserBalance}
            key={user._id}
            userId={user._id}
            userName={`${user.firstName} ${user.lastName}`}
            icon={user.userName}
            image={user.profilePic}
          />
        );
      }) : <div className="text-center mt-20 text-xl">No Users found</div> }
    </div>
  );
};

export default Dashboard;
