import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'

function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const dispatch = useDispatch()

  const register = (e) => {
    if (!name) {
      return alert('Please enter your name')
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: photoUrl,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: photoUrl,
              })
            )
          })
      })
      .catch((error) => alert(error.message))
  }

  const loginToApp = (event) => {
    event.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        )
      })
      .catch((error) => alert(error.message))
  }
  return (
    <div className='login'>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png'
        alt=''
      />

      <form>
        <input
          placeholder='Full Name (required if registering)'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder='Profile pic Url'
          type='text'
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
        />
        <button onClick={loginToApp} type='submit'>
          Sign In
        </button>
      </form>

      <p>
        Not a member?{' '}
        <span className='login__register' onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  )
}

export default Login
