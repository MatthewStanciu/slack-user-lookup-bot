const Botkit = require('botkit')

const controller = new Botkit.slackbot({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  clientSigningSecret: process.env.SIGNING_SECRET,
  scopes: ['bot', 'chat:write:bot']
})

controller.spawn({
  token: process.env.ACCESS_TOKEN
})

controller.setupWebserver(process.env.PORT || 3000, (err, webserver) => {
  controller.createWebhookEndpoints(controller.webserver)
  controller.createOauthEndpoints(controller.webserver)
})

controller.on('slash_command', (bot, message) => {
  if (message.text.includes('@')) {
    const id = message.text.split('|')[0].slice(2)
    bot.replyPrivate(message, `<@${id}>'s User ID is ${id}`)
  }
  else
    bot.replyPrivate(message, `${message.text}'s display name is <@${message.text}>`)
})
