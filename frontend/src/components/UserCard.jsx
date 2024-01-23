import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../services/api';
import { PaymentModal } from './PaymentModal';

const UserCard = ({userName , icon , userId , getUserBalance}) => {
    
  return (
    <>
    <div className='flex items-center justify-between py-2 my-2 bg-slate-200 cursor-pointer px-1'> 
       
        <div className=''>
      
            <h2>{userName}</h2>
            <h2>{icon}</h2>
        </div>
        <div>
            {/* <button 
            // onClick={handleSendPayment}
             className='bg-black text-white px-3 py-2 text-sm rounded-md'>Send Money</button> */}
               <PaymentModal  userId={userId} userName={userName} icon={icon} getUserBalance={getUserBalance}/>
        </div>
      
    </div>
    </>
  )
}

export default UserCard