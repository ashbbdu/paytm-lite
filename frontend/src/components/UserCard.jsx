import React from "react";
import { PaymentModal } from "./PaymentModal";

const UserCard = ({ userName, icon, userId, getUserBalance, image, index }) => {
  return (
    <>
      <div className="flex items-center justify-between py-2 my-2 bg-slate-200 cursor-pointer px-1">
        <div className="flex items-center gap-2">
          <div>
            <img
              src={image}
              alt="profile-pic"
              className="rounded-full w-8 h-8"
            />
          </div>
          <div>
            <h2>{userName}</h2>
            <h2>{icon}</h2>
          </div>
        </div>
        <div>
          <PaymentModal
            userId={userId}
            userName={userName}
            icon={icon}
            getUserBalance={getUserBalance}
          />
        </div>
      </div>
    </>
  );
};

export default UserCard;
