//Imports
const Botkit = require('botkit')

// For development, make sure you have all of your .env values!
const controller = new Botkit.slackbot({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  clientSigningSecret: process.env.SIGNING_SECRET,
  scopes: ['bot', 'chat:write:bot'],
  debug: false
})

controller.spawn({
  token: process.env.ACCESS_TOKEN
})

controller.setupWebserver(process.env.PORT || 3000, (err, webserver) => {
  controller.createWebhookEndpoints(controller.webserver)
  controller.createOauthEndpoints(controller.webserver)
})

controller.on('slash_command', (bot, message) => {
  //You can use either the user id or the user name as parameters to the function.
  if (message.text.includes('@')) {
    // Splitting up the values
    // The id is the first thing that you can pass as an argument.
    const id = message.text.split('|')[0].slice(2)
    // The user name will always be the second item; Slack just deals with it that way.
    const user = message.text.split('|')[1]
    const userTrimmed = user.slice(0, user.length-1)
    
    bot.replyPrivate(message, `<@${id}>'s User ID is ${id}`)
  }
  else
    // If you passed the name as a parameter, it will parse through that.
    bot.replyPrivate(message, `${message.text}'s display name is <@${message.text}>`)
})
