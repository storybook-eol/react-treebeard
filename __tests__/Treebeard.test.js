import React from 'react';
import {shallow} from 'enzyme';
import {castArray} from 'lodash';

import Treebeard from '../src/components';
import data from '../example/data';

describe('<Treebeard/>', () => {
    it('should match default snapshot', () => {
        const wrapper = shallow(<Treebeard data={castArray(data)}/>);
        expect(wrapper).toMatchSnapshot();
    });
});
