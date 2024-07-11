import React from 'react'
import { getInitials } from '../../utils/helper'


const ProfileInfo = ({userInfo, onLogout,}) => {



  return (
    <div className='flex items-center gap-3'>
     <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>{getInitials(userInfo?.name)}</div>

     <div>
        <p className=''>{userInfo?.name}</p>
        <button className='underline text-sm text-slate-700 ' onClick={onLogout}>
            Logout
        </button>
     </div>
    </div>
  )
}

export default ProfileInfo