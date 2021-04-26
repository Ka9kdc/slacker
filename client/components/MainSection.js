import React, {useEffect, useState} from 'react'
import {fetchMessages} from '../store/messages'
import MessageBox from './MessageBox'
import {connect} from 'react-redux'
import NewMessage from './NewMessage'
import ProfileSection from './ProfileSection'
import ChannelOptions from './ChannelOptions'

const MainSection = props => {
  const [currentChannel, setChannel] = useState(0)
  const [editProfile, setEditProfile] = useState(false)

  useEffect(
    () => {
      if (currentChannel !== 0) {
        props.fetchMessages(currentChannel)
      } else if (props.channels && props.channels.length) {
        setChannel(props.channels[0].id)
      }
    },
    [props.channels, currentChannel]
  )

  return (
    <div>
      <ChannelOptions setChannel={setChannel} />
      {(props.user && (!props.user.fullName || !props.user.username)) ||
      editProfile ? (
        <ProfileSection setEditProfile={setEditProfile} />
      ) : (
        <button type="button" onClick={() => setEditProfile(true)}>
          Edit Profile
        </button>
      )}
      <MessageBox />
      <NewMessage currentChannel={currentChannel} />
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user,
    channels: state.channels
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMessages: channelId => dispatch(fetchMessages(channelId))
  }
}

export default connect(mapState, mapDispatch)(MainSection)
