const router = require('express').Router()
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

router.use('/users', require('./users'))
router.use('/messages', loggedInUser, require('./messages'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
