import React, {useState} from 'react'
import {connect} from 'react-redux'
import {createMessage} from '../store/messages'

const NewMessage = props => {
  const [text, setMessage] = useState('')

  const submitMessage = evt => {
    evt.preventDefault()
    props.addMessage(text)
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
    addMessage: text => dispatch(createMessage(text))
  }
}

export default connect(null, mapDispatch)(NewMessage)
