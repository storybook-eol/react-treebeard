'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NodeHeader = function (_React$Component) {
    (0, _inherits3.default)(NodeHeader, _React$Component);

    function NodeHeader() {
        (0, _classCallCheck3.default)(this, NodeHeader);
        return (0, _possibleConstructorReturn3.default)(this, (NodeHeader.__proto__ || (0, _getPrototypeOf2.default)(NodeHeader)).apply(this, arguments));
    }

    (0, _createClass3.default)(NodeHeader, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            var props = this.props;
            var nextPropKeys = (0, _keys2.default)(nextProps);

            for (var i = 0; i < nextPropKeys.length; i++) {
                var key = nextPropKeys[i];
                if (key === 'animations') {
                    continue;
                }

                var isEqual = (0, _shallowequal2.default)(props[key], nextProps[key]);
                if (!isEqual) {
                    return true;
                }
            }

            return !(0, _deepEqual2.default)(props.animations, nextProps.animations, { strict: true });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                animations = _props.animations,
                decorators = _props.decorators,
                node = _props.node,
                onClick = _props.onClick,
                style = _props.style;
            var active = node.active,
                children = node.children;

            var terminal = !children;
            var container = [style.link, active ? style.activeLink : null];
            var headerStyles = (0, _assign2.default)({ container: container }, style);

            return _react2.default.createElement(decorators.Container, { animations: animations,
                decorators: decorators,
                node: node,
                onClick: onClick,
                style: headerStyles,
                terminal: terminal });
        }
    }]);
    return NodeHeader;
}(_react2.default.Component);

NodeHeader.propTypes = {
    style: _propTypes2.default.object.isRequired,
    decorators: _propTypes2.default.object.isRequired,
    animations: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]).isRequired,
    node: _propTypes2.default.object.isRequired,
    onClick: _propTypes2.default.func
};

exports.default = NodeHeader;