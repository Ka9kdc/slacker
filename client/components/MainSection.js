import React, {useEffect, useState} from 'react'
import {fetchMessages} from '../store/messages'
import MessageBox from './MessageBox'
import {connect} from 'react-redux'
import NewMessage from './NewMessage'
import ProfileSection from './ProfileSection'

const MainSection = props => {
  const [currentChannel, setChannel] = useState(0)
  const [editProfile, setEditProfile] = useState(false)

  useEffect(() => {
    props.fetchMessages()
  }, currentChannel)
  console.log(editProfile, props.user)
  return (
    <div>
      <button type="button" onClick={() => setChannel(currentChannel + 1)}>
        current Channel = {currentChannel}
      </button>
      {(props.user && (!props.user.fullName || !props.user.username)) ||
      editProfile ? (
        <ProfileSection setEditProfile={setEditProfile} />
      ) : (
        <button type="button" onClick={() => setEditProfile(true)}>
          Edit Profile
        </button>
      )}
      <MessageBox />
      <NewMessage />
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMessages: () => dispatch(fetchMessages())
  }
}

export default connect(mapState, mapDispatch)(MainSection)
