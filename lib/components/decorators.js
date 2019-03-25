'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _velocityReact = require('velocity-react');

var _styled = require('@emotion/styled');

var _styled2 = _interopRequireDefault(_styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Div = (0, _styled2.default)('div', {
    shouldForwardProp: function shouldForwardProp(prop) {
        return ['className', 'children'].indexOf(prop) !== -1;
    }
})(function (_ref) {
    var style = _ref.style;
    return style;
});
var Polygon = (0, _styled2.default)('polygon', {
    shouldForwardProp: function shouldForwardProp(prop) {
        return ['className', 'children', 'points'].indexOf(prop) !== -1;
    }
})(function (_ref2) {
    var style = _ref2.style;
    return style;
});

var Loading = (0, _styled2.default)(function (_ref3) {
    var className = _ref3.className;

    return _react2.default.createElement(
        'div',
        { className: className },
        'loading...'
    );
})(function (_ref4) {
    var style = _ref4.style;
    return style;
});

Loading.propTypes = {
    style: _propTypes2.default.object
};

var Toggle = function Toggle(_ref5) {
    var style = _ref5.style;
    var height = style.height,
        width = style.width;

    var midHeight = height * 0.5;
    var points = '0,0 0,' + height + ' ' + width + ',' + midHeight;

    return _react2.default.createElement(
        Div,
        { style: style.base },
        _react2.default.createElement(
            Div,
            { style: style.wrapper },
            _react2.default.createElement(
                'svg',
                { height: height, width: width },
                _react2.default.createElement(Polygon, { points: points,
                    style: style.arrow })
            )
        )
    );
};
Toggle.propTypes = {
    style: _propTypes2.default.object
};

var Header = function Header(_ref6) {
    var node = _ref6.node,
        style = _ref6.style;

    return _react2.default.createElement(
        Div,
        { style: style.base },
        _react2.default.createElement(
            Div,
            { style: style.title },
            node.name
        )
    );
};
Header.propTypes = {
    style: _propTypes2.default.object,
    node: _propTypes2.default.object.isRequired
};

var Container = function (_React$Component) {
    (0, _inherits3.default)(Container, _React$Component);

    function Container() {
        (0, _classCallCheck3.default)(this, Container);
        return (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).apply(this, arguments));
    }

    (0, _createClass3.default)(Container, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                style = _props.style,
                decorators = _props.decorators,
                terminal = _props.terminal,
                onClick = _props.onClick,
                node = _props.node;

            var containerStyle = _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)(style.container)));
            return _react2.default.createElement(
                'div',
                {
                    onClick: onClick,
                    ref: function ref(_ref7) {
                        return _this2.clickableRef = _ref7;
                    },
                    style: containerStyle },
                !terminal ? this.renderToggle() : null,
                _react2.default.createElement(decorators.Header, {
                    node: node,
                    style: style.header
                })
            );
        }
    }, {
        key: 'renderToggle',
        value: function renderToggle() {
            var _this3 = this;

            var animations = this.props.animations;


            if (!animations) {
                return this.renderToggleDecorator();
            }

            return _react2.default.createElement(
                _velocityReact.VelocityComponent,
                { animation: animations.toggle.animation,
                    duration: animations.toggle.duration,
                    ref: function ref(_ref8) {
                        return _this3.velocityRef = _ref8;
                    } },
                this.renderToggleDecorator()
            );
        }
    }, {
        key: 'renderToggleDecorator',
        value: function renderToggleDecorator() {
            var _props2 = this.props,
                style = _props2.style,
                decorators = _props2.decorators;


            return _react2.default.createElement(decorators.Toggle, { style: style.toggle });
        }
    }]);
    return Container;
}(_react2.default.Component);

Container.propTypes = {
    style: _propTypes2.default.object.isRequired,
    decorators: _propTypes2.default.object.isRequired,
    terminal: _propTypes2.default.bool.isRequired,
    onClick: _propTypes2.default.func.isRequired,
    animations: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]).isRequired,
    node: _propTypes2.default.object.isRequired
};

exports.default = {
    Loading: Loading,
    Toggle: Toggle,
    Header: Header,
    Container: Container
};