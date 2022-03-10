// Mongoose connection
const { connect, connection } = require('mongoose');

// Heroku deployment
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB'

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = connection;