import React from 'react'

const Navbar = () => {
    const {firstName} = JSON.parse(localStorage.getItem("userDetails"))
    console.log(firstName , "firs");
  return (
    <div className='flex items-center justify-between bg-white px-2 py-4 border border-b-slate-300'>
        <div>
            <h2>Payments App</h2>
        </div>
        <div>
            Hello , {firstName}
        </div>
    </div>
  )
}

export default Navbar