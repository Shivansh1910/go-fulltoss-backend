const { v4: uuidv4 } = require("uuid");

async function generateIdentifier() {
  return uuidv4();
}

module.exports = {
  generateIdentifier: generateIdentifier,
};
