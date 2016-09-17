'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';

var TreeBeard = function (_React$Component) {
    _inherits(TreeBeard, _React$Component);

    function TreeBeard(props) {
        _classCallCheck(this, TreeBeard);

        return _possibleConstructorReturn(this, (TreeBeard.__proto__ || Object.getPrototypeOf(TreeBeard)).call(this, props));
    }

    _createClass(TreeBeard, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var animations = _props.animations;
            var decorators = _props.decorators;
            var decoratorProps = _props.decoratorProps;
            var data = _props.data;
            var onToggle = _props.onToggle;
            var style = _props.style;
            // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.

            if (!Array.isArray(data)) {
                data = [data];
            }
            return React.createElement(
                'ul',
                { style: style.tree.base, ref: 'treeBase' },
                data.map(function (node, index) {
                    return React.createElement(TreeNode, _extends({
                        key: node.id || index,
                        node: node,
                        onToggle: onToggle,
                        animations: animations,
                        decorators: decorators,
                        style: style.tree.node
                    }, decoratorProps));
                })
            );
        }
    }]);

    return TreeBeard;
}(React.Component);

TreeBeard.propTypes = {
    style: React.PropTypes.object,
    data: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]).isRequired,
    animations: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.bool]),
    onToggle: React.PropTypes.func,
    decorators: React.PropTypes.object
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators
};

export default TreeBeard;