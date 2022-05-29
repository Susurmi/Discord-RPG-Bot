const path = require('path');
const fs = require('fs');

async function registerFeatures(client, dir) {
  try {
    const featureDirectory = fs.readdirSync(path.join(__dirname, dir));

    featureDirectory.forEach((feature) => {
      console.log(feature + ' - Feature loaded!');
      const featureFiles = fs.readdirSync(path.join(__dirname, dir, feature));
      featureFiles.forEach((featureIndex) => {
        if (!featureIndex.endsWith('.js')) return;
        if (featureIndex.substring(0, featureIndex.indexOf('.js')) != 'index')
          return;
        require(path.join(__dirname, dir, feature, featureIndex))(client);
      });
    });
  } catch (error) {
    console.log('no feature dir.');
  }
}

module.exports = registerFeatures;
