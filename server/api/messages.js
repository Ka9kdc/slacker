const router = require('express').Router()
const {User, Messages} = require('../db/models')

router.put('/:messageId', async (req, res,next) => {
    try {
        const message = req.body
        if(req.user !== message.userId){
            const newError = Error("Not your Message. Can not update.")
            newError.code = 401
            throw newError
        }
         const [count, rows] = await Messages.update({
            text: message.text,
            date: message.date,
            edited: true
        }, { where: { id: req.params.messageId}})
        if(count === 1 ) {
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