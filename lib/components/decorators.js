'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Radium from 'radium';
import { VelocityComponent } from 'velocity-react';

var Loading = function Loading(props) {
    return React.createElement(
        'div',
        { style: props.style },
        'loading...'
    );
};

Loading.propTypes = {
    style: React.PropTypes.object
};

var Toggle = function Toggle(props) {
    var style = props.style;
    var height = style.height;
    var width = style.width;
    var midHeight = height * 0.5;
    var points = '0,0 0,' + height + ' ' + width + ',' + midHeight;
    return React.createElement(
        'div',
        { style: style.base },
        React.createElement(
            'div',
            { style: style.wrapper },
            React.createElement(
                'svg',
                { height: height, width: width },
                React.createElement('polygon', {
                    points: points,
                    style: style.arrow
                })
            )
        )
    );
};

Toggle.propTypes = {
    style: React.PropTypes.object
};

var Header = function Header(props) {
    var style = props.style;
    return React.createElement(
        'div',
        { style: style.base },
        React.createElement(
            'div',
            { style: style.title },
            props.node.name
        )
    );
};

Header.propTypes = {
    style: React.PropTypes.object,
    node: React.PropTypes.object.isRequired
};

var Container = Radium(_class = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container(props) {
        _classCallCheck(this, Container);

        return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));
    }

    _createClass(Container, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var style = _props.style;
            var decorators = _props.decorators;
            var terminal = _props.terminal;
            var onClick = _props.onClick;
            var node = _props.node;

            return React.createElement(
                'div',
                {
                    ref: 'clickable',
                    onClick: onClick,
                    style: style.container },
                !terminal ? this.renderToggle() : null,
                React.createElement(decorators.Header, {
                    node: node,
                    style: style.header
                })
            );
        }
    }, {
        key: 'renderToggle',
        value: function renderToggle() {
            var animations = this.props.animations;
            if (!animations) {
                return this.renderToggleDecorator();
            }

            return React.createElement(
                VelocityComponent,
                { ref: 'velocity',
                    duration: animations.toggle.duration,
                    animation: animations.toggle.animation },
                this.renderToggleDecorator()
            );
        }
    }, {
        key: 'renderToggleDecorator',
        value: function renderToggleDecorator() {
            var _props2 = this.props;
            var style = _props2.style;
            var decorators = _props2.decorators;

            return React.createElement(decorators.Toggle, { style: style.toggle });
        }
    }]);

    return Container;
}(React.Component)) || _class;

Container.propTypes = {
    style: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    terminal: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired,
    animations: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.bool]).isRequired,
    node: React.PropTypes.object.isRequired
};

export default {
    Loading: Loading,
    Toggle: Toggle,
    Header: Header,
    Container: Container
};