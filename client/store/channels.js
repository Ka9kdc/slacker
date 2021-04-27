/* eslint-disable no-case-declarations */
import axios from 'axios'

const SET_CHANNELS = 'SET_CHANNELS'
const JOIN_CHANNEL = 'JOIN_CHANNEL'
const ADD_CHANNEL = 'ADD_CHANNEL'

const initalChannels = []

const setChannels = channels => {
  return {
    type: SET_CHANNELS,
    channels
  }
}

export const joinChannel = channelId => {
  return {
    type: JOIN_CHANNEL,
    channelId
  }
}

const addChannel = channel => {
  return {
    type: ADD_CHANNEL,
    channel
  }
}

export const fetchChannels = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/channels')
      dispatch(setChannels(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchAllChannels = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/channels/all')
      dispatch(setChannels(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateChannels = channels => {
  return async dispatch => {
    try {
      const res = await axios.put('/api/channels', {channels})
      console.log(res.data)
      dispatch(setChannels(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createChannel = name => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/channels', {name})
      dispatch(addChannel(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

const channelReducer = (state = initalChannels, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      return action.channels
    case JOIN_CHANNEL:
      const myChannels = state.map(channel => {
        if (channel.id === action.channelId) {
          channel.joined = true
        }
        return channel
      })
      return myChannels
    case ADD_CHANNEL:
      return [...state, action.channel]
    default:
      return state
  }
}

export default channelReducer
