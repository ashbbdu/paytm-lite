import axios from 'axios'
import React, { memo, useEffect, useState } from 'react'
import { BASE_URL } from '../services/api'

const UserDetails = memo(() => {
    const [userBalance , setUserBalace] = useState(0);
    const token = localStorage.getItem("token")
    const getUserBalance = async () => {
        const balance = await axios.get(BASE_URL + "bank/balance" , {headers : {"Authorization" : `Bearer ${token}`}})
        setUserBalace(balance.data.balance)
    }
    useEffect(() => {
       getUserBalance();
    })
  return (
    <div>
        Your current balance is : ${userBalance}
    </div>
  )
})

export default UserDetails