const router = require('express').Router()
const {User, Messages} = require('../db/models')
module.exports = router

const loggedInUser = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    const newError = Error('Please login')
    newError.code = 401
    next(newError)
  }
}

router.post('/', loggedInUser, async (req, res, next) => {
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

router.put('/:messageId', loggedInUser, async (req, res, next) => {
  try {
    const message = req.body
    if (req.user !== message.userId) {
      const newError = Error('Not your Message. Can not update.')
      newError.code = 401
      throw newError
    }
    const [count, rows] = await Messages.update(
      {
        text: message.text,
        date: new Date(),
        edited: true
      },
      {where: {id: req.params.messageId}}
    )
    if (count === 1) {
      res.send(rows[0])
    } else {
      const newError = Error(`${count} rows were changed`)
      newError.code = 400
      throw newError
    }
  } catch (error) {
    next(error)
  }
})
