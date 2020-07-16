'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    this.ctx.body = {
      name: 'Ctrl ....',
    };
  }
}
module.exports = UserController;

