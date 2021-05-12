import {makeKeyProp} from '../src/util';

describe('makeKeyProp', () => {
    it('should return id first', () => {
        expect(makeKeyProp({id: 'uniqueId'})).toBe('uniqueId');
    });
    it('should return random string if no id is present', () => {
        expect(typeof makeKeyProp({})).toBe('string');
    });
});
