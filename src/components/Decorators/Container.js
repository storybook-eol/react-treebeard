import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {VelocityComponent} from 'velocity-react';

class Container extends PureComponent {
    renderToggle() {
        const {animations} = this.props;

        if (!animations) {
            return this.renderToggleDecorator();
        }

        return (
            <VelocityComponent
                animation={animations.toggle.animation}
                duration={animations.toggle.duration}
            >
                {this.renderToggleDecorator()}
            </VelocityComponent>
        );
    }

    renderToggleDecorator() {
        const {style, decorators, onClickToggle} = this.props;
        return <decorators.Toggle style={style.toggle} onClick={onClickToggle ? () => onClickToggle() : null}/>;
    }

    render() {
        const {style, decorators, terminal, onClick, onClickHeader, node} = this.props;
        return (
            <div
                onClick={onClick ? () => onClick() : null}
                style={node.active ? {...style.container} : {...style.link}}
            >
                {!terminal ? this.renderToggle() : null}
                <decorators.Header
                    node={node}
                    style={style.header}
                    onClick={onClickHeader} />
            </div>
        );
    }
}

Container.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    terminal: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    onClickToggle: PropTypes.func,
    onClickHeader: PropTypes.func,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]).isRequired,
    node: PropTypes.object.isRequired,
};

export default Container;
