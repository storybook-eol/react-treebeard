'use strict';

import React from 'react';
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
            <decorators.HeaderContainer
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
    style: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object.isRequired,
    node: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
};


// @Radium
// class NodeHeader extends React.Component {
//     constructor(props){
//         super(props);
//     }
//     shouldComponentUpdate(nextProps){
//         return !deepEqual(this.props, nextProps, { strict: true });
//     }
//     // render(){
//     //     // const {style, animations, decorators} = this.props;
//     //     // const terminal = !this.props.node.children;
//     //     // const active = this.props.node.active;
//     //     // const linkStyle = [style.link, active ? style.activeLink : null];
//     //     const Container = this.props.decorators.HeaderContainer;
//     //     return (
//     //         <Container
//     //             onClick={this.props.onClick}
//     //         >
//     //         <this.props.decorators.Toggle style={this.props.style.toggle}/>
//     //         </Container>
//     //
//     //     );
//     // }
//     render(){
//         const {style, animations, decorators} = this.props;
//         const terminal = !this.props.node.children;
//         const active = this.props.node.active;
//         const linkStyle = [style.link, active ? style.activeLink : null];
//         return (
//             <div
//                 ref="clickable"
//                 onClick={this.props.onClick}
//                 stxsyle={linkStyle}>
//                 { !terminal ? this.renderToggle(decorators, animations) : '' }
//                 <decorators.Header
//                     node={this.props.node}
//                     style={style.header}
//                 />
//             </div>
//         );
//     }
//     renderToggle(decorators, animations){
//         const Toggle = decorators.Toggle;
//         const style = this.props.style;
//         return (
//             <VelocityComponent ref="velocity"
//                 duration={animations.toggle.duration}
//                 animation={animations.toggle.animation}>
//                 <Toggle style={style.toggle}/>
//             </VelocityComponent>
//         );
//     }
// }
//
// NodeHeader.propTypes = {
//     style: React.PropTypes.object.isRequired,
//     decorators: React.PropTypes.object.isRequired,
//     animations: React.PropTypes.object.isRequired,
//     node: React.PropTypes.object.isRequired,
//     onClick: React.PropTypes.func
// };

export default NodeHeader;
