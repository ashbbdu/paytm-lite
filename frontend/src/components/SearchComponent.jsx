import React from 'react'

const SearchComponent = ({searchText , setSearchText , allUsers}) => {
    const handleChange = async (e) => {
        setSearchText(e.target.value);
    }
  return (
    <div>
        <h2>Users</h2>
        <input className='w-full h-9 px-2 my-1 rounded-md' value={searchText} onChange={handleChange} placeholder="Search Users..." />
    </div>
  )
}

export default SearchComponent