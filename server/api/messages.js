const router = require('express').Router()
const {Messages, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allMessages = await Messages.findAll({
      include: {model: User, attributes: ['username', 'fullName', 'imgUrl']}
    })
    res.send(allMessages)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const message = req.body
    const newMessage = await Messages.create({
      text: message.text,
      date: new Date(),
      userId: req.user.id
    })
    res.send(newMessage)
  } catch (error) {
    next(error)
  }
})

router.put('/:messageId', async (req, res, next) => {
  try {
    const message = req.body
    const messageToUpdate = await Messages.findByPk(req.params.messageId)
    if (!messageToUpdate) {
      const newError = Error(`No Message to update`)
      newError.code = 400
      throw newError
    }
    if (
      req.user.id !== Number(message.userId) ||
      messageToUpdate.userId !== Number(message.userId) ||
      req.user.id !== messageToUpdate.userId
    ) {
      const newError = Error('Not your Message. Can not update.')
      newError.code = 401
      throw newError
    }

    messageToUpdate.text = message.text
    messageToUpdate.date = new Date()
    messageToUpdate.edited = true
    await messageToUpdate.save()
    res.send(messageToUpdate)
  } catch (error) {
    next(error)
  }
})

router.delete('/:messageId', async (req, res, next) => {
  try {
    const message = await Messages.findByPk(req.params.messageId)
    if (!message) {
      const newError = Error('Message not Found')
      newError.code = 400
      throw newError
    } else if (req.user.id !== Number(message.userId)) {
      const newError = Error('Not your Message. Can not delete')
      newError.code = 401
      throw newError
    }
    await message.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
