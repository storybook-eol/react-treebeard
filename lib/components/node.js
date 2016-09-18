'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

            var style = this.props.style;

            return React.createElement(
                'li',
                { style: style.base, ref: 'topLevel' },
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
        value: function renderHeader(decorators, animations) {
            return React.createElement(NodeHeader, {
                decoratorProps: this.props.decoratorProps,
                decorators: decorators,
                animations: animations,
                style: this.props.style,
                node: _extends({}, this.props.node),
                onClick: this.onClick
            });
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren(decorators) {
            var _this2 = this;

            if (this.props.node.loading) {
                return this.renderLoading(decorators);
            }

            return React.createElement(
                'ul',
                { style: this.props.style.subtree, ref: 'subtree' },
                rutils.children.map(this.props.node.children, function (child, index) {
                    return React.createElement(TreeNode, _extends({}, _this2._eventBubbles(), {
                        key: child.id || index,
                        node: child,
                        decorators: _this2.props.decorators,
                        decoratorProps: _this2.props.decoratorProps,
                        animations: _this2.props.animations,
                        style: _this2.props.style
                    }));
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
                    React.createElement(decorators.Loading, _extends({ style: this.props.style.loading }, this.props.decoratorProps))
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
    decoratorProps: React.PropTypes.object,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.bool]).isRequired,
    onToggle: React.PropTypes.func
};

export default TreeNode;