'use strict';

import React from 'react';
import Radium from 'radium';
import {VelocityComponent} from 'velocity-react';

@Radium
class NodeHeader extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const {style, animations, decorators, childrenGetter} = this.props;
        const terminal = !childrenGetter(this.props.node);
        const active = this.props.node.active;
        const linkStyle = [style.link, active ? style.activeLink : null];
        return (
            <div
                ref="hyperlink"
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
        const Toggle = decorators.Toggle;
        const style = this.props.style;
        return (
            <VelocityComponent ref="velocity"
                duration={animations.toggle.duration}
                animation={animations.toggle.animation}>
                <Toggle style={style.toggle}/>
            </VelocityComponent>
        );
    }
}

NodeHeader.propTypes = {
    style: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object.isRequired,
    node: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func,
    childrenGetter: React.PropTypes.func.isRequired
};

export default NodeHeader;
