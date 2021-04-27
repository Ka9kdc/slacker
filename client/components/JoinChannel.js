import React from 'react'
import {connect} from 'react-redux'
import {joinChannel, updateChannels} from '../store/channels'

const JoinChannel = props => {
  const submitUpdate = evt => {
    evt.preventDefault()
    props.submitChannelUpdate(props.channels)
    props.changeJoinMore(false)
  }
  return (
    <div>
      {props.channels &&
        props.channels.map(channel => (
          <div key={channel.id}>
            <p>{channel.name}</p>
            {channel.joined ? (
              <p>Joined</p>
            ) : (
              <button
                type="button"
                onClick={() => props.joinChannel(channel.id)}
              >
                Join
              </button>
            )}
          </div>
        ))}
      <button type="submit" onClick={submitUpdate}>
        Save
      </button>
    </div>
  )
}

const mapState = state => {
  return {
    channels: state.channels
  }
}

const mapDispatch = dispatch => {
  return {
    joinChannel: channelId => dispatch(joinChannel(channelId)),
    submitChannelUpdate: channels => dispatch(updateChannels(channels))
  }
}

export default connect(mapState, mapDispatch)(JoinChannel)
