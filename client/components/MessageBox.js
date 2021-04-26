import React from 'react'
import {connect} from 'react-redux'
import {deleteMessage, edittingMessage} from '../store/messages'
import EditMessage from './EditMessage'

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
                  <h3>
                    {message.user.username || message.user.fullName || 'anyone'}
                  </h3>
                )}
                <p>{message.date}</p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => props.startEditting(message.id)}
                >
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
            {message.editting ? (
              <EditMessage message={message} />
            ) : (
              <p>
                {message.text}
                <span>{message.edited ? ' editted' : ''}</span>
              </p>
            )}
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
    deleteMessage: messageId => dispatch(deleteMessage(messageId)),
    startEditting: messageId => dispatch(edittingMessage(messageId))
  }
}

export default connect(mapState, mapDispatch)(MessageBox)
