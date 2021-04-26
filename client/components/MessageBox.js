import React from 'react'
import {connect} from 'react-redux'
import {deleteMessage} from '../store/messages'

const MessageBox = props => {
  console.log(props.messages)
  return (
    <div>
      {props.messages &&
        props.messages.map(message => (
          <div key={message.id}>
            <div>
              {message.user &&
                message.user.imgUrl && <img src={message.user.imgUrl} />}
              <div>
                {message.user && (
                  <h3>{message.user.username || message.user.fullName}</h3>
                )}
                <p>{message.date}</p>
              </div>
              <div>
                <button type="button" onClick={() => console.log('edit')}>
                  edit
                </button>
                <button
                  type="button"
                  onClick={() => props.deleteMessage(message.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p>
              {message.text}
              <span>{message.editted ? 'editted' : ''}</span>
            </p>
          </div>
        ))}
    </div>
  )
}

const mapState = state => {
  return {
    messages: state.messages
  }
}

const mapDispatch = dispatch => {
  return {
    deleteMessage: messageId => dispatch(deleteMessage(messageId))
  }
}

export default connect(mapState, mapDispatch)(MessageBox)
