require('dotenv').config();
const { ExtendedClient } = require('./client/index');

const Bot = new ExtendedClient();

Bot.start(process.env.BOT_TOKEN);
