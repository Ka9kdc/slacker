import React, {useState} from 'react'
import {connect} from 'react-redux'
import {editMessage} from '../store/messages'

const EditMessage = props => {
  const [text, setText] = useState(props.message.text)

  const submitEdit = evt => {
    evt.preventDefault()
    const newMessage = props.message
    newMessage.text = text
    props.updateMessage(newMessage)
  }

  return (
    <div>
      <textarea value={text} onChange={evt => setText(evt.target.value)} />
      <button type="button" onClick={submitEdit}>
        Update
      </button>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    updateMessage: message => dispatch(editMessage(message))
  }
}

export default connect(null, mapDispatch)(EditMessage)
