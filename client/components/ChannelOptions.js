import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchAllChannels, fetchChannels} from '../store/channels'
import {setChannelAndGetMessages} from '../store/currentChannel'
import AddChannel from './AddChannel'
import JoinChannel from './JoinChannel'

const ChannelOptions = props => {
  const [joinMore, changeJoinMore] = useState(false)
  const [addChannel, setAddChannel] = useState(false)

  useEffect(
    () => {
      if (joinMore) {
        props.fetchAll()
      } else {
        props.fetchMine()
      }
    },
    [props.channels.length, joinMore]
  )

  return (
    <div>
      {props.channels && props.channels.length
        ? props.channels.map(channel => (
            <button
              type="button"
              onClick={() => {
                props.setChannel(channel)
              }}
              key={channel.id}
            >
              {channel.name}
            </button>
          ))
        : ''}
      {joinMore ? (
        <JoinChannel changeJoinMore={changeJoinMore} />
      ) : (
        <button type="button" onClick={() => changeJoinMore(true)}>
          Join More Channels
        </button>
      )}
      {addChannel ? (
        <AddChannel setAddChannel={setAddChannel} />
      ) : (
        <button type="button" onClick={() => setAddChannel(true)}>
          Create A New Channel
        </button>
      )}
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
    fetchAll: () => dispatch(fetchAllChannels()),
    fetchMine: () => dispatch(fetchChannels()),
    setChannel: channel => dispatch(setChannelAndGetMessages(channel))
  }
}

export default connect(mapState, mapDispatch)(ChannelOptions)
