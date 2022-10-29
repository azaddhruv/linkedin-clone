import React, { useEffect, useState } from 'react'
import './Feed.css'
import Post from './Post'
import CreateIcon from '@mui/icons-material/Create'
import InputOption from './InputOption'
import ImageIcon from '@mui/icons-material/Image'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import EventIcon from '@mui/icons-material/Event'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { db } from './firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import FlipMove from 'react-flip-move'
import { query, orderBy, limit } from 'firebase/firestore'

function Feed() {
  const user = useSelector(selectUser)
  const [input, setInput] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    )
  }, [])

  const sendPost = (e) => {
    e.preventDefault()
    console.log(user)
    db.collection('posts').add({
      name: `${user.displayName}`,
      description: `${user.email}`,
      message: input,
      photoUrl: user.photoUrl || '',
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('')
  }
  return (
    <div className='feed'>
      <div className='feed__inputContainer'>
        <div className='feed__input'>
          <CreateIcon />
          <form>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendPost} type='submit'>
              Send
            </button>
          </form>
        </div>
        <div className='feed_inputOptions'>
          <InputOption Icon={ImageIcon} title={'photo'} color='#70B5F9' />
          <InputOption
            Icon={SubscriptionsIcon}
            title={'Video'}
            color='#E7A33E'
          />
          <InputOption Icon={EventIcon} title={'Event'} color='#COCBCD' />
          <InputOption
            Icon={CalendarTodayIcon}
            title={'Write Article'}
            color='#7FC15E'
          />
        </div>
      </div>
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => {
          return (
            <Post
              key={id}
              name={name}
              description={description}
              message={message}
              photoUrl={photoUrl}
            />
          )
        })}
      </FlipMove>
    </div>
  )
}

export default Feed
