import axios from 'axios'

const SET_CHANNELS = 'SET_CHANNELS'

const initalChannels = []

const setChannels = channels => {
  return {
    type: SET_CHANNELS,
    channels
  }
}

export const fetchChannels = () => {
  return async dispatch => {
    try {
      const res = await axios('/api/channels')
      dispatch(setChannels(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

const channelReducer = (state = initalChannels, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      return action.channels
    default:
      return state
  }
}

export default channelReducer
