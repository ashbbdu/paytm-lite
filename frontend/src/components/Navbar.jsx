import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
    const { profilePic } = JSON.parse(localStorage.getItem("userDetails"))
    const handleLogout = () => {
      localStorage.clear()
      navigate("/")
    }
  return (
    <div className='flex items-center justify-between bg-white px-2 py-4 border border-b-slate-300'>
        <div>
            <h2>Payments App</h2>
        </div>
        <div className='flex items-center gap-4'>
         
            <div onClick={handleLogout} className='cursor-pointer'>
            <h2>Logout</h2>
            </div>
            <div>
            <img className='rounded-full w-8 h-8' src={profilePic} alt="profile-pic" />
          </div>
        </div>
    </div>
  )
}

export default Navbar