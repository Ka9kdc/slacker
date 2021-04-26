import React, {useEffect, useState} from 'react'
import {fetchMessages} from '../store/messages'
import MessageBox from './MessageBox'
import {connect} from 'react-redux'

const MainSection = props => {
  const [currentChannel, setChannel] = useState(0)

  useEffect(() => {
    props.fetchMessages()
  }, currentChannel)

  return (
    <div>
      <button type="button" onClick={() => setChannel(currentChannel + 1)}>
        current Channel = {currentChannel}
      </button>
      <MessageBox />
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    fetchMessages: () => dispatch(fetchMessages())
  }
}

export default connect(null, mapDispatch)(MainSection)
