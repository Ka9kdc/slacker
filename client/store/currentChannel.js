import {fetchMessages} from './messages'

const initialChannel = {}

const SET_CHANNEL = 'SET_CHANNEL'

const setChannel = channel => {
  return {
    type: SET_CHANNEL,
    channel
  }
}

export const setChannelAndGetMessages = channel => {
  return dispatch => {
    try {
      dispatch(setChannel(channel))
      dispatch(fetchMessages(channel.id))
    } catch (error) {
      console.error(error)
    }
  }
}

const currentChannel = (state = initialChannel, action) => {
  switch (action.type) {
    case SET_CHANNEL:
      return action.channel

    default:
      return state
  }
}

export default currentChannel
