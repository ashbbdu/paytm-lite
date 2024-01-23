import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setToken, setUser } from '../store/slices/userSlice'
import { toast } from 'react-hot-toast'

const Navbar = () => {
  const dispatch = useDispatch()
    const { profilePic } = JSON.parse(localStorage.getItem("userDetails"))
    const handleLogout = () => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("userDetails")
      toast.success("Logged Out")
    }
  return (
    <div className='flex items-center justify-between bg-white px-2 py-4 border border-b-slate-300'>
        <div>
            <h2>Payments App</h2>
        </div>
        <div className='flex items-center gap-4'>
          <ul className='flex items-center gap-4'>
          <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>
              <Link to="/refer">Refer and Earn</Link>
            </li>
          </ul>
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