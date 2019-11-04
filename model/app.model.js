var db = require('../utils/Database');

module.exports = {
  all: () => {
    return db.load('SELECT * FROM Account');
  },
  add: entity => {
    return db.add(`Account`, entity);
  },
  findOne: (username) => {
    return db.load(`select * from Account where username = '${username}'`);
  },
  findOneById: (id) => {
    return db.load(`select * from Account where id = '${id}'`);
  }
};