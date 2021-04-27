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

router.get('/all', async (req, res, next) => {
  try {
    const allChannels = await Channel.findAll({attributes: ['id', 'name']})
    let myChannels = await req.user.getChannels()
    let markedChannels
    console.log(myChannels.length)
    if (myChannels.length === allChannels.length) {
      markedChannels = allChannels.map(channel => {
        channel.dataValues.joined = true
        return channel
      })
    } else if (myChannels.length && allChannels.length) {
      myChannels = myChannels.map(channel => channel.id)
      console.log(myChannels)
      markedChannels = allChannels.map(channel => {
        if (myChannels.indexOf(channel.id) !== -1)
          channel.dataValues.joined = true
        else channel.dataValues.joined = false
        return channel
      })
      console.log(markedChannels)
    } else if (allChannels.length) {
      markedChannels = allChannels.map(channel => {
        channel.dataValues.joined = false
        return channel
      })
    } else {
      res.send([])
    }
    res.send(markedChannels)
  } catch (err) {
    next(err)
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

router.post('/', async (req, res, next) => {
  try {
    const newChannel = await Channel.create({name: req.body.name})
    await req.user.addChannel(newChannel)
    res.send(newChannel)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const channel = await req.user.addChannel(req.body.channelId)
    res.send(channel[0])
  } catch (error) {
    next(error)
  }
})
