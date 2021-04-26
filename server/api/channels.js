const router = require('express').Router()
const {Messages, User, Channel} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = req.user
    const channels = await user.getChannels()
    res.send(channels)
  } catch (error) {
    next(error)
  }
})

router.get('/:channelId', async (req, res, next) => {
  try {
    const allMessages = await Messages.findAll({
      where: {channelId: req.params.channelId},
      include: {model: User, attributes: ['username', 'fullName', 'imgUrl']}
    })
    res.send(allMessages)
  } catch (error) {
    next(error)
  }
})
