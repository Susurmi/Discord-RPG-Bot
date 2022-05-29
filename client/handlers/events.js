const path = require('path');
const fs = require('fs');
const { Events } = require('../validation/events');

async function registerEvents(client, dir) {
  try {
    const eventDirectory = fs.readdirSync(path.join(__dirname, dir));

    eventDirectory.forEach((file) => {
      const filePath = path.join(__dirname, dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        const newPath = path.join(dir, file);
        return registerEvents(client, newPath);
      } else {
        let eventName = file.substring(0, file.indexOf('.js'));
        if (file.endsWith('.js') && Events.includes(eventName)) {
          let EventModule = require(filePath);
          client.on(eventName, (...args) =>
            EventModule.execute(...args, client)
          );
          console.log('Event: "' + eventName + '" loaded!');
        } else {
          console.log(`Error! File: ${file}`);
        }
      }
    });
  } catch (error) {
    console.log('no events dir.');
  }
}

module.exports = registerEvents;
