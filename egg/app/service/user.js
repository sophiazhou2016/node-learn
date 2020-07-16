'use strict';
const { Service } = require('egg');

class UserService extends Service {
  async getAll() {
    return [
      {
        name: 'Service...',
      },
    ];
  }
}

module.exports = UserService;
