import io from 'socket.io-client'
import store from './store'
import currentChannel from './store/currentChannel'
import {addMessage, removeMessage, updateMessage} from './store/messages'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new message', message => {
  console.log(message)
  const current = store.getState().currentChannel
  console.log(current)
  if (message.channelId === current.id) {
    store.dispatch(addMessage(message))
  }
})

socket.on('update message', message => {
  if (message.channelId === store.getState(currentChannel.id)) {
    store.dispatch(updateMessage(message))
  }
})

socket.on('delete message', messageId => {
  store.dispatch(removeMessage(messageId))
})

export default socket
