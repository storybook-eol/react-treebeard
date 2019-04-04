import React, {createRef, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {VelocityComponent} from 'velocity-react';

import Header from './Header';
import Loading from './Loading';
import Toggle from './Toggle';

class Container extends PureComponent {
    constructor(props) {
        super(props);
        this.velocityRef = createRef();
        this.clickableRef = createRef();
    }

    renderToggle() {
        const {animations} = this.props;

        if (!animations) {
            return this.renderToggleDecorator();
        }

        return (
            <VelocityComponent
                animation={animations.toggle.animation}
                duration={animations.toggle.duration}
                ref={this.velocityRef}>
                {this.renderToggleDecorator()}
            </VelocityComponent>
        );
    }

    renderToggleDecorator() {
        const {style, decorators} = this.props;
        return <decorators.Toggle style={style.toggle}/>;
    }

    render() {
        const {style, decorators, terminal, onClick, node} = this.props;
        return (
            <div
                onClick={onClick}
                ref={this.clickableRef}
                style={Object.assign({}, ...style.container)}>
                {!terminal ? this.renderToggle() : null}

                <decorators.Header node={node} style={style.header}/>
            </div>
        );
    }
}

Container.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    terminal: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    node: PropTypes.object.isRequired
};

export default {
    Loading,
    Toggle,
    Header,
    Container
};
