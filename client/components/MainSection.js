import React, {useState} from 'react'
import {fetchMessages} from '../store/messages'
import MessageBox from './MessageBox'
import {connect} from 'react-redux'
import NewMessage from './NewMessage'
import ProfileSection from './ProfileSection'
import ChannelOptions from './ChannelOptions'

const MainSection = props => {
  const [editProfile, setEditProfile] = useState(false)

  return (
    <div>
      <ChannelOptions />
      {(props.user && (!props.user.fullName || !props.user.username)) ||
      editProfile ? (
        <ProfileSection setEditProfile={setEditProfile} />
      ) : (
        <button type="button" onClick={() => setEditProfile(true)}>
          Edit Profile
        </button>
      )}
      <h2>{props.currentChannel.name}</h2>
      <MessageBox />
      <NewMessage />
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user,
    channels: state.channels,
    currentChannel: state.currentChannel
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMessages: channelId => dispatch(fetchMessages(channelId))
  }
}

export default connect(mapState, mapDispatch)(MainSection)
