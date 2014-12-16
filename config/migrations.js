// Path : ./config/migrations.js

//TODO use environment config
module.exports = {
  development: {
    schema: { 'migration': {} },
    modelName: 'Migration',
    db: process.env.MONGOHQ_URL || 'mongodb://development:development@ds063630.mongolab.com:63630/tictac-dev'
  },
  production: {
    schema: { 'migration': {} },
    modelName: 'Migration',
    db: process.env.MONGOHQ_URL || 'mongodb://production:production@ds063630.mongolab.com:63630/tictac'
  },
  acceptance: {
    schema: { 'migration': {} },
    modelName: 'Migration',
    db: process.env.MONGOHQ_URL || 'mongodb://test:test@ds063630.mongolab.com:63630/tictac-test'
  }
};
