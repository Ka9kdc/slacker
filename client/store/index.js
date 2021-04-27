import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {messageReducer} from './messages'
import channelReducer from './channels'
import currentChannel from './currentChannel'

const reducer = combineReducers({
  user,
  messages: messageReducer,
  channels: channelReducer,
  currentChannel
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
