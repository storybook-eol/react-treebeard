'use strict';

import React from 'react';
import radium from 'radium';
import {VelocityComponent} from 'velocity-react';
import passThrough from 'react-passthrough';

const Loading = radium((props) => {
    return (
        <div style={props.style}>
            loading...
        </div>
    );
});

Loading.propTypes = {
    style: React.PropTypes.object
};

const Toggle = radium((props) => {
    const style = props.style;
    const height = style.height;
    const width = style.width;
    let midHeight = height * 0.5;
    let points = `0,0 0,${height} ${width},${midHeight}`;
    return (
        <div style={style.base}>
            <div style={style.wrapper}>
                <svg height={height} width={width}>
                    <polygon
                        points={points}
                        style={style.arrow}
                    />
                </svg>
            </div>
        </div>
    );
});

Toggle.propTypes = {
    style: React.PropTypes.object
};

const Header = radium((props) => {
    const style = props.style;
    return (
        <div style={style.base}>
            <div style={style.title}>
                {props.node.name}
            </div>
        </div>
    );
});

Header.propTypes = {
    style: React.PropTypes.object,
    node: React.PropTypes.object.isRequired
};

@radium
class Container extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const {style, decorators, terminal, onClick, node} = this.props;
        return (
            <div
                ref="clickable"
                onClick={onClick}
                style={style.container}>
                { !terminal ? this.renderToggle() : null }
                <decorators.Header
                    {...this.passthrough()}
                    node={node}
                    style={style.header}
                />
            </div>
        );
    }
    renderToggle(){
        const animations = this.props.animations;
        if(!animations){ return this.renderToggleDecorator(); }
        return (
            <VelocityComponent ref="velocity"
                duration={animations.toggle.duration}
                animation={animations.toggle.animation}>
                {this.renderToggleDecorator()}
            </VelocityComponent>
        );
    }
    renderToggleDecorator(){
        const {style, decorators} = this.props;
        return (<decorators.Toggle {...this.passthrough()} style={style.toggle}/>);
    }
}

Container.propTypes = {
    style: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    terminal: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired,
    animations: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.bool
    ]).isRequired,
    node: React.PropTypes.object.isRequired
};

passThrough({omit: ['children', 'form']})(Container);

export default {
    Loading,
    Toggle,
    Header,
    Container
};
