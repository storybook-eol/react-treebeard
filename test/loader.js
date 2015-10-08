'use strict';
require('./support/env');
var testsContext = require.context('./src', true, /-tests$/);
testsContext.keys().forEach(testsContext);
