import React from 'react'
import ProfileInfo from '../cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar';
import { useState } from 'react';

const Navbar = ({userInfo}) => {
 const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate();

  const onLogout = () => {
  localStorage.clear()
   navigate("/login")
  }

const handleSearch = () => {

};

const onClearSearch = () => {
setSearchQuery('')
};

  return (
    <div className='bg-white py-2  flex item-center justify-between px-6 drop-shadow'>
  <h2 className='text-xl font-medium text-black py-2 '>Notes.</h2>
  

  <SearchBar
   value={searchQuery}
   onChange={({target}) => {
    setSearchQuery(target.value)
   }}

   handleSearch={handleSearch}
   onClearSearch={onClearSearch}
    />


  <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar