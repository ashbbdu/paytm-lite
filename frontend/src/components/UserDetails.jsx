import React, { memo } from 'react'
const UserDetails = memo(({userBalance}) => {

  return (
    <div>
        Your current balance is : $ {userBalance}
    </div>
  )
})

export default UserDetails