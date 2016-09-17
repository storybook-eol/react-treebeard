'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import rutils from 'react-utils';
import { VelocityTransitionGroup } from 'velocity-react';

import NodeHeader from './header';

var TreeNode = function (_Component) {
    _inherits(TreeNode, _Component);

    function TreeNode(props) {
        _classCallCheck(this, TreeNode);

        var _this = _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call(this, props));

        _this.onClick = function () {
            var toggled = !_this.props.node.toggled;
            var onToggle = _this.props.onToggle;
            if (onToggle) {
                onToggle(_this.props.node, toggled);
            }
        };

        return _this;
    }

    _createClass(TreeNode, [{
        key: 'animations',
        value: function animations() {
            var props = this.props;
            if (props.animations === false) {
                return false;
            }
            var anim = Object.assign({}, props.animations, props.node.animations);
            return {
                toggle: anim.toggle(this.props),
                drawer: anim.drawer(this.props)
            };
        }
    }, {
        key: 'decorators',
        value: function decorators() {
            // Merge Any Node Based Decorators Into The Pack
            var _props = this.props;
            var decorators = _props.decorators;
            var node = _props.node;

            var nodeDecorators = node.decorators || {};

            return _extends({}, decorators, nodeDecorators);
        }
    }, {
        key: 'render',
        value: function render() {
            var decs = this.decorators();
            var anims = this.animations();

            var _props2 = this.props;
            var animations = _props2.animations;
            var decorators = _props2.decorators;
            var key = _props2.key;
            var onToggle = _props2.onToggle;
            var node = _props2.node;
            var style = _props2.style;

            var other = _objectWithoutProperties(_props2, ['animations', 'decorators', 'key', 'onToggle', 'node', 'style']);

            return React.createElement(
                'li',
                _extends({ style: style.base }, other, { ref: 'topLevel' }),
                this.renderHeader(decs, anims),
                this.renderDrawer(decs, anims)
            );
        }
    }, {
        key: 'renderDrawer',
        value: function renderDrawer(decorators, animations) {
            var toggled = this.props.node.toggled;
            if (!animations && !toggled) {
                return null;
            }
            if (!animations && toggled) {
                return this.renderChildren(decorators, animations);
            }
            return React.createElement(
                VelocityTransitionGroup,
                _extends({}, animations.drawer, { ref: 'velocity' }),
                toggled ? this.renderChildren(decorators, animations) : null
            );
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader(decs, anims) {
            var _props3 = this.props;
            var animations = _props3.animations;
            var decorators = _props3.decorators;
            var key = _props3.key;
            var node = _props3.node;
            var onToggle = _props3.onToggle;
            var style = _props3.style;

            var other = _objectWithoutProperties(_props3, ['animations', 'decorators', 'key', 'node', 'onToggle', 'style']);

            return React.createElement(NodeHeader, _extends({
                decorators: decs,
                animations: anims,
                style: style,
                node: _extends({}, node),
                onClick: this.onClick
            }, other));
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren(decs) {
            var _this2 = this;

            var _props4 = this.props;
            var animations = _props4.animations;
            var decorators = _props4.decorators;
            var key = _props4.key;
            var onToggle = _props4.onToggle;
            var node = _props4.node;
            var style = _props4.style;

            var other = _objectWithoutProperties(_props4, ['animations', 'decorators', 'key', 'onToggle', 'node', 'style']);

            if (this.props.node.loading) {
                return this.renderLoading(decs);
            }

            return React.createElement(
                'ul',
                { style: this.props.style.subtree, ref: 'subtree' },
                rutils.children.map(node.children, function (child, index) {
                    return React.createElement(TreeNode, _extends({}, _this2._eventBubbles(), {
                        key: child.id || index,
                        node: child,
                        decorators: decorators,
                        animations: animations,
                        style: style
                    }, other));
                })
            );
        }
    }, {
        key: 'renderLoading',
        value: function renderLoading(decorators) {
            return React.createElement(
                'ul',
                { style: this.props.style.subtree },
                React.createElement(
                    'li',
                    null,
                    React.createElement(decorators.Loading, { style: this.props.style.loading })
                )
            );
        }
    }, {
        key: '_eventBubbles',
        value: function _eventBubbles() {
            return { onToggle: this.props.onToggle };
        }
    }]);

    return TreeNode;
}(Component);

TreeNode.propTypes = {
    style: React.PropTypes.object.isRequired,
    node: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.bool]).isRequired,
    onToggle: React.PropTypes.func
};

export default TreeNode;