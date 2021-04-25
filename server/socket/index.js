module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new message', message => {
      console.log(message)
      socket.broadcast('new message', message)
    })

    socket.on('update message', message => {
      console.log(message)
      socket.broadcast('update message', message)
    })

    socket.on('delete message', messageId => {
      socket.broadcast('delete message', messageId)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
