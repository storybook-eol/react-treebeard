'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import deepEqual from 'deep-equal';

class NodeHeader extends React.Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        const props = this.props;
        const nextPropKeys = Object.keys(nextProps);
        for(let i = 0; i < nextPropKeys.length; i++){
            const key = nextPropKeys[i];
            if(key === 'animations'){ continue; }
            const isEqual = shallowEqual(props[key], nextProps[key]);
            if(!isEqual){ return true; }
        }
        return !deepEqual(props.animations, nextProps.animations, { strict: true });
    }
    render(){
        const {style, decorators} = this.props;
        const terminal = !this.props.node.children;
        const active = this.props.node.active;
        const container = [style.link, active ? style.activeLink : null];
        const headerStyles = Object.assign({ container }, this.props.style);
        return (
            <decorators.Container
                style={headerStyles}
                decorators={decorators}
                terminal={terminal}
                onClick={this.props.onClick}
                animations={this.props.animations}
                node={this.props.node}
            />
        );
    }
}

NodeHeader.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    node: PropTypes.object.isRequired,
    onClick: PropTypes.func
};

export default NodeHeader;
