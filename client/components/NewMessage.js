import React, {useRef, useState} from 'react'
import {connect} from 'react-redux'
import {createMessage} from '../store/messages'
import EditorJS from 'react-editor-js'
import {EDITOR_JS_TOOLS} from './tools'

const NewMessage = props => {
  const instanceRef = useRef(null)

  const submitMessage = async evt => {
    evt.preventDefault()
    const text = await instanceRef.current.save()
    console.log(text.blocks)
    props.addMessage(text, props.currentChannel.id)
  }

  return (
    <div>
      <EditorJS
        tools={EDITOR_JS_TOOLS}
        instanceRef={instance => {
          instanceRef.current = instance
        }}
      />
      <button type="button" onClick={submitMessage}>
        Submit
      </button>
    </div>
  )
}

const mapState = state => {
  return {
    currentChannel: state.currentChannel
  }
}

const mapDispatch = dispatch => {
  return {
    addMessage: (text, channelId) => dispatch(createMessage(text, channelId))
  }
}

export default connect(mapState, mapDispatch)(NewMessage)
