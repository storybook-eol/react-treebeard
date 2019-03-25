'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styled = require('@emotion/styled');

var _styled2 = _interopRequireDefault(_styled);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _decorators = require('./decorators');

var _decorators2 = _interopRequireDefault(_decorators);

var _default = require('../themes/default');

var _default2 = _interopRequireDefault(_default);

var _animations = require('../themes/animations');

var _animations2 = _interopRequireDefault(_animations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ul = (0, _styled2.default)('ul', {
    shouldForwardProp: function shouldForwardProp(prop) {
        return ['className', 'children'].indexOf(prop) !== -1;
    }
})(function (_ref) {
    var style = _ref.style;
    return style;
});

var TreeBeard = function (_React$Component) {
    (0, _inherits3.default)(TreeBeard, _React$Component);

    function TreeBeard() {
        (0, _classCallCheck3.default)(this, TreeBeard);
        return (0, _possibleConstructorReturn3.default)(this, (TreeBeard.__proto__ || (0, _getPrototypeOf2.default)(TreeBeard)).apply(this, arguments));
    }

    (0, _createClass3.default)(TreeBeard, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                animations = _props.animations,
                decorators = _props.decorators,
                propsData = _props.data,
                onToggle = _props.onToggle,
                style = _props.style;

            var data = propsData;

            // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
            if (!Array.isArray(data)) {
                data = [data];
            }
            return _react2.default.createElement(
                Ul,
                { style: style.tree.base,
                    ref: function ref(_ref2) {
                        return _this2.treeBaseRef = _ref2;
                    } },
                data.map(function (node, index) {
                    return _react2.default.createElement(_node2.default, { animations: animations,
                        decorators: decorators,
                        key: node.id || index,
                        node: node,
                        onToggle: onToggle,
                        style: style.tree.node });
                })
            );
        }
    }]);
    return TreeBeard;
}(_react2.default.Component);

TreeBeard.propTypes = {
    style: _propTypes2.default.object,
    data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]).isRequired,
    animations: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
    onToggle: _propTypes2.default.func,
    decorators: _propTypes2.default.object
};

TreeBeard.defaultProps = {
    style: _default2.default,
    animations: _animations2.default,
    decorators: _decorators2.default
};

exports.default = TreeBeard;