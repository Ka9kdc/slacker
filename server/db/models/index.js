const User = require('./user')
const Messages = require('./messages')
const Channel = require('./channels')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Messages)
Messages.belongsTo(User)

Channel.hasMany(Messages)
Messages.belongsTo(Channel)

Channel.belongsToMany(User, {through: 'channel_user'})
User.belongsToMany(Channel, {through: 'channel_user'})

module.exports = {
  User,
  Messages,
  Channel
}
