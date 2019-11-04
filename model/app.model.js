var db = require('../utils/Database');

module.exports = {
  all: () => {
    return db.load('SELECT * FROM Account');
  },
  add: entity => {
    return db.add(`Account`, entity);
  },
  findOne: (email) => {
    return db.load(`select * from Account where email = '${email}'`);
  },
  findOneById: (id) => {
    return db.load(`select * from Account where id = '${id}'`);
  },
  update: entity => {
    return db.update(`Account`, 'id', entity);
  }
};