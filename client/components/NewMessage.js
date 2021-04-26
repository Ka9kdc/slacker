import React, {useState} from 'react'
import {connect} from 'react-redux'
import {createMessage} from '../store/messages'

const NewMessage = props => {
  const [text, setMessage] = useState('')

  const submitMessage = evt => {
    evt.preventDefault()
    props.addMessage(text, props.currentChannel)
    setMessage('')
  }

  return (
    <div>
      <textarea value={text} onChange={evt => setMessage(evt.target.value)} />
      <button type="button" onClick={submitMessage}>
        Submit
      </button>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    addMessage: (text, channelId) => dispatch(createMessage(text, channelId))
  }
}

export default connect(null, mapDispatch)(NewMessage)
