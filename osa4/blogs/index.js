const app = require('./app')
const config = require('./utils/config')
const { mostBlogs } = require('./utils/list_helper')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})