const { Client, Collection, Intents } = require('discord.js');
const registerCommands = require('./handlers/commands');
const registerEvents = require('./handlers/events');
const registerFeatures = require('./handlers/features');

// Extending the Orginial Client from discord.js
class ExtendedClient extends Client {
  // adding a Collection (Array of Objects) as a Cache for all Guild Configs
  configs = new Collection();
  commands = new Collection();

  //   Setting default Intents if no Intetns a provided as Class Options
  constructor(options) {
    if (!options) {
      super({
        //   Appending Default Intents
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
      });
    } else {
      // Appeding Provided Intents
      super(options);
    }
  }

  //   Start function for the bot
  start = async (token, dbURI) => {
    // Register all Events from the Event Folder
    registerEvents(this, '../../events');
    //Enable all Features from the Feature Directory
    registerFeatures(this, '../../features');
    //Register all Commands from the Commands Directory
    registerCommands(this, '../../commands');
    // Logging in the Bot to Discord
    this.login(token);
  };
}

exports.ExtendedClient = ExtendedClient;
