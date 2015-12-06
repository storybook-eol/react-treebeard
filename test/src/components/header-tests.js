/*  eslint no-unused-expressions:0  */

'use strict';

const sinon = require('sinon');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Header = require('../../../src/components/header');
const factory = require('../utils/factory');

const defaults = {
    style: {},
    node: { children: [] },
    animations: { toggle: {} },
    decorators: factory.createDecorators()
};

describe('header component', () => {
    it('should render the header container decorator', () => {
    });

});
