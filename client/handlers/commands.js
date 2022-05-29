const { Perms } = require('../validation/permissions');
const fs = require('fs');
const path = require('path');
const { Client } = require('discord.js');

module.exports = async (client, dir) => {
  commandsArray = [];
  await getCommands(client, dir);

  client.on('ready', async () => {
    const mainGuild = await client.guilds.cache.get(process.env.GUILD_ID);
    await mainGuild.commands.set(commandsArray);
  });
};

async function getCommands(client, dir) {
  try {
    const commandDirectory = fs.readdirSync(path.join(__dirname, dir));
    commandDirectory.forEach((file) => {
      const filePath = path.join(__dirname, dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        const newPath = path.join(dir, file);
        return getCommands(client, newPath);
      }
      if (!file.endsWith('.js')) {
        return console.log(
          `Commandfile ${file} is not a valid file, please make sure its a Javascript(.js) File!`
        );
      } else {
        const command = require(filePath);
        if (!command.name)
          return console.log(`Missing name in the ${file} command.`);
        if (!command.description)
          return console.log(`Missing description in the ${file} command.`);
        if (command.permission && Perms.includes(command.permission)) {
          command.defaultPermission = false;
        } else {
          return console.log(`Missing permissions in the ${file} command.`);
        }
        client.commands.set(command.name, command);
        commandsArray.push(command);
        console.log(command.name + ' - Command loaded!');
      }
    });
  } catch (error) {
    console.log('no commands dir.');
  }
}
