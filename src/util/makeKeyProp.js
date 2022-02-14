import randomString from './randomString';

const makeKeyProp = (node) => node.id || randomString();

export default makeKeyProp;
