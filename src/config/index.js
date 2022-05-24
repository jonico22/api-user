const ambiente = process.env.NODE_ENV || 'development'

let configuraciónDeAmbiente = {}

switch (ambiente) {
  case 'desarrollo':
  case 'dev':
  case 'development':
    configuraciónDeAmbiente = require('./development')
    break
  case 'production':
  case 'prod':
    configuraciónDeAmbiente = require('./production')
    break
  case 'test':
    configuraciónDeAmbiente = require('./test')
    break
  default:
    configuraciónDeAmbiente = require('./development')
}

module.exports = {
  ...configuraciónDeAmbiente
}