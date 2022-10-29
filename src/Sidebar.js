import { Avatar } from '@mui/material'
import React from 'react'
import { selectUser } from './features/userSlice'
import './Sidebar.css'
import { useSelector } from 'react-redux'

function Sidebar() {
  const user = useSelector(selectUser)
  const recentItems = (topic) => {
    return (
      <div className='sidebar__recentItem'>
        <span className='sidebar__hash'>#</span>
        <p>{topic}</p>
      </div>
    )
  }

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <img
          src='https://images.unsplash.com/photo-1573767291321-c0af2eaf5266?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZnV0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
          alt=''
        />
        <Avatar src={user.photoUrl} className='sidebar__avatar' />
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>
      <div className='sidebar__stats'>
        <div className='sidebar__stat'>
          <p>Who viewed you</p>
          <p className='sidebar__statNumber'>2,456</p>
        </div>
        <div className='sidebar__stat'>
          <p>Views on post</p>
          <p className='sidebar__statNumber'>2,536</p>
        </div>
      </div>
      <div className='sidebar__bottom'>
        <p>Recent</p>
        {recentItems('reactjs')}
        {recentItems('programming')}
        {recentItems('nodejs')}
        {recentItems('softwareDevlopement')}
        {recentItems('DSA')}
      </div>
    </div>
  )
}

export default Sidebar
