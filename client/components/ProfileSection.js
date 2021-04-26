import React, {useState} from 'react'
import {connect} from 'react-redux'
import {updateProfile} from '../store'

const ProfileSection = props => {
  const [fullName, setName] = useState(props.user.fullName || '')
  const [username, setUserName] = useState(props.user.username || '')

  const submitUpdate = evt => {
    evt.preventDefault()
    const updateObj = props.user
    if (fullName !== '' || fullName !== ' ') {
      updateObj.fullName = fullName
    }
    if (username !== '' || username !== ' ') {
      updateObj.username = username
    }
    props.updateProfile(updateObj)
    props.setEditProfile(false)
  }

  return (
    <div>
      <h2>Update Profile Information</h2>
      <label htmlFor="fullName">Full Name</label>
      <input
        type="text"
        value={fullName}
        onChange={evt => setName(evt.target.value)}
      />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        value={username}
        onChange={evt => setUserName(evt.target.value)}
      />
      <button type="submit" onClick={submitUpdate}>
        Submit
      </button>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    updateProfile: profileObj => dispatch(updateProfile(profileObj))
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(ProfileSection)
