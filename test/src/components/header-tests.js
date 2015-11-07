/*  eslint no-unused-expressions:0  */

'use strict';

const sinon = require('sinon');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Header = require('../../../src/components/header');
const factory = require('../utils/factory');

const defaults = {
    style: {},
    node: {},
    animations: { toggle: {} },
    decorators: factory.createDecorators()
};

describe('header component', () => {
    it('should render a hyperlink with a click event handler', () => {
        const onClick = sinon.spy();
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                onClick={onClick}
            />
        );
        const hyperlink = header.refs.hyperlink;
        TestUtils.Simulate.click(hyperlink);
        onClick.should.be.called.once;
    });

    it('should render the toggle decorator if the node is not terminal', () => {
        const toggleType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ toggle: toggleType });
        const node = { terminal: false };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                node={node}
                decorators={decorators}
            />
        );
        const toggle = TestUtils.findRenderedComponentWithType(header, toggleType);
        toggle.should.exist;
    });

    it('should not render the toggle decorator if the node is terminal', () => {
        const toggleType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ toggle: toggleType });
        const node = { terminal: true };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                decorators={decorators}
                node={node}
            />
        );
        const toggle = TestUtils.scryRenderedComponentsWithType(header, toggleType);
        toggle.should.be.empty;
    });

    it('should pass the style to the toggle decorator', () => {
        const style = { toggle: { color: 'red' } };
        const toggleType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ toggle: toggleType });
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                decorators={decorators}
                style={style}
            />
        );
        const toggle = TestUtils.findRenderedComponentWithType(header, toggleType);
        toggle.props.style.should.equal(style.toggle);
    });

    it('should render the toggle decorator in a velocity component', () => {
        const VelocityComponent = require('velocity-react').VelocityComponent;
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}/>
        );
        const component = TestUtils.findRenderedComponentWithType(header, VelocityComponent);
        component.should.exist;
    });

    it('should pass velocity the animation and duration props', () => {
        const animations = { toggle: { duration: 1, animation: 'slideUp' } };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                animations={animations}
            />
        );
        const velocity = header.refs.velocity;
        velocity.props.duration.should.equal(animations.toggle.duration);
        velocity.props.animation.should.equal(animations.toggle.animation);
    });

    it('should render the header decorator', () => {
        const headType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ header: headType });
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                decorators={decorators}
            />
        );
        const head = TestUtils.findRenderedComponentWithType(header, headType);
        head.should.exist;
    });

    it('should pass the node and style to the header decorator', () => {
        const style = { header: { color: 'red' } };
        const node = { terminal: true };
        const headType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ header: headType });
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                decorators={decorators}
                node={node}
                style={style}
            />
        );
        const head = TestUtils.findRenderedComponentWithType(header, headType);
        head.props.style.should.equal(style.header);
        head.props.node.should.equal(node);
    });
});
