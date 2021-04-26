import io from 'socket.io-client'
import store from './store'
import {addMessage, removeMessage, updateMessage} from './store/messages'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new message', message => {
  console.log(message)
  store.dispatch(addMessage(message))
})

socket.on('update message', message => {
  console.log(message)
  store.dispatch(updateMessage(message))
})

socket.on('delete message', messageId => {
  store.dispatch(removeMessage(messageId))
})

export default socket
