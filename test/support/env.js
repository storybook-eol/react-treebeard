'use strict';
process.env.NODE_ENV = 'test';
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.config.showDiff = false;
global.should = chai.should();
chai.use(sinonChai);
