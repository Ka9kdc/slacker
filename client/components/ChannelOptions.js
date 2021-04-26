import React from 'react'
import {connect} from 'react-redux'

const ChannelOptions = props => {
  return (
    <div>
      {props.channels && props.channels.length ? (
        props.channels.map(channel => (
          <button
            type="button"
            onClick={() => {
              props.setChannel(channel.id)
            }}
            key={channel.id}
          >
            {channel.name}
          </button>
        ))
      ) : (
        <button type="button" onClick={() => console.log('create channel')}>
          Create Channel
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

export default connect(mapState)(ChannelOptions)
