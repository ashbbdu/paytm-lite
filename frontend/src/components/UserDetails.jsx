import React, { memo } from 'react'
import { useSelector } from "react-redux"
const UserDetails = memo(() => {
const { bankBalance } = useSelector(state => state.bank)
console.log(bankBalance , "bankbal");
  return (
    <div>
        Your current balance is : $ {bankBalance}
    </div>
  )
})

export default UserDetails