/* eslint-disable no-case-declarations */
import axios from 'axios'
import socket from '../socket'

const GET_MESSAGES = 'GET_MESSAGES'
const ADD_MASSAGE = 'ADD_MASSAGES'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
const EDITTING_MESSAGE = 'EDITTING_MESSAGE'

const initalMessages = []

const getMessages = messages => {
  return {
    type: GET_MESSAGES,
    messages
  }
}

export const addMessage = message => {
  return {
    type: ADD_MASSAGE,
    message
  }
}

export const edittingMessage = messageId => {
  return {
    type: EDITTING_MESSAGE,
    messageId
  }
}

export const updateMessage = message => {
  return {
    type: UPDATE_MESSAGE,
    message
  }
}

export const removeMessage = messageId => {
  return {
    type: REMOVE_MESSAGE,
    messageId
  }
}

export const fetchMessages = channelId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/channels/${channelId}`)
      dispatch(getMessages(res.data))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const createMessage = (text, channelId) => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/messages', {text, channelId})
      dispatch(addMessage(res.data))
      socket.emit('new message', res.data)
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const editMessage = message => {
  return async dispatch => {
    try {
      const res = await axios.put(`api/messages/${message.id}`, message)
      dispatch(updateMessage(res.data))
      socket.emit('update message', res.data)
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const deleteMessage = messageId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/messages/${messageId}`)
      dispatch(removeMessage(messageId))
      socket.emit('delete message', messageId)
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const messageReducer = (state = initalMessages, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages
    case ADD_MASSAGE:
      return [...state, action.message]
    case UPDATE_MESSAGE:
      const updatedMessages = state.map(message => {
        if (message.id === action.message.id) {
          return action.message
        } else {
          return message
        }
      })
      return updatedMessages
    case REMOVE_MESSAGE:
      const remaining = state.filter(message => message.id !== action.messageId)
      return remaining
    case EDITTING_MESSAGE:
      const edittingmessages = state.map(message => {
        if (message.id === action.messageId) {
          message.editting = true
        }
        return message
      })
      return edittingmessages
    default:
      return state
  }
}
