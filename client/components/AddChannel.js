import React, {useState} from 'react'
import {connect} from 'react-redux'
import {createChannel} from '../store/channels'

const AddChannel = props => {
  const [name, setName] = useState('')
  const submitChannel = evt => {
    evt.preventDefault()
    props.addChannel(name)
    props.setAddChannel(false)
    setName('')
  }
  return (
    <div>
      <label htmlFor="Channel Name">Channel Name</label>
      <input
        type="text"
        value={name}
        onChange={evt => setName(evt.target.value)}
      />
      <button type="submit" onClick={submitChannel}>
        Submit
      </button>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    addChannel: name => dispatch(createChannel(name))
  }
}

export default connect(null, mapDispatch)(AddChannel)
