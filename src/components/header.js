'use strict';

import React from 'react';
import Radium from 'radium';

@Radium
class NodeHeader extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const {style, animations, decorators, hasChildren} = this.props;
        const terminal = !hasChildren;
        const active = this.props.node.active;
        const linkStyle = [style.link, active ? style.activeLink : null];
        return (
            <div
                onClick={this.props.onClick}
                style={linkStyle}>
                { !terminal ? this.renderToggle(decorators, animations) : '' }
                <decorators.Header
                    node={this.props.node}
                    style={style.header}
                />
            </div>
        );
    }
    renderToggle(decorators, animations){
        const style = this.props.style;
        return (
            <decorators.Toggle style={style.toggle} animations={animations.toggle}/>
        )
    }
}

NodeHeader.propTypes = {
    style: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object.isRequired,
    node: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func,
    children: React.PropTypes.array
};

export default NodeHeader;
