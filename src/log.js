const { Signale } = require('signale');
const pjson = require('../package.json');

module.exports = new Signale({
  scope: pjson.name,
  types: {
    contributions: {
      badge: '●',
      color: 'blue',
      label: 'contributions'
    },
    currentStreak: {
      badge: '▶',
      color: 'green',
      label: 'current streak'
    },
    bestStreak: {
      badge: '★',
      color: 'yellow',
      label: 'best streak'
    }
  }
});
