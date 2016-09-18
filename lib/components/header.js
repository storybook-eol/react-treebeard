'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import shallowEqual from 'shallowequal';
import deepEqual from 'deep-equal';

var NodeHeader = function (_React$Component) {
    _inherits(NodeHeader, _React$Component);

    function NodeHeader(props) {
        _classCallCheck(this, NodeHeader);

        return _possibleConstructorReturn(this, (NodeHeader.__proto__ || Object.getPrototypeOf(NodeHeader)).call(this, props));
    }

    _createClass(NodeHeader, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            var props = this.props;
            var nextPropKeys = Object.keys(nextProps);
            for (var i = 0; i < nextPropKeys.length; i++) {
                var key = nextPropKeys[i];
                if (key === 'animations') {
                    continue;
                }
                var isEqual = shallowEqual(props[key], nextProps[key]);
                if (!isEqual) {
                    return true;
                }
            }
            return !deepEqual(props.animations, nextProps.animations, { strict: true });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var style = _props.style;
            var decorators = _props.decorators;
            var decoratorProps = _props.decoratorProps;

            var terminal = !this.props.node.children;
            var active = this.props.node.active;
            var container = [style.link, active ? style.activeLink : null];
            var headerStyles = Object.assign({ container: container }, this.props.style);
            return React.createElement(decorators.Container, {
                style: headerStyles,
                decorators: decorators,
                decoratorProps: decoratorProps,
                terminal: terminal,
                onClick: this.props.onClick,
                animations: this.props.animations,
                node: this.props.node
            });
        }
    }]);

    return NodeHeader;
}(React.Component);

NodeHeader.propTypes = {
    style: React.PropTypes.object.isRequired,
    decoratorProps: React.PropTypes.object,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.bool]).isRequired,
    node: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
};

export default NodeHeader;