# Change log

### v3.2.3
- Fix background when node is active [PR #196](https://github.com/storybooks/react-treebeard/pull/196)
- Add unit testing (Treebeard, TreeNode and NodeHeader)
- Add pre-push to husky for run test

### v3.2.2
- Fix merge styles and destruct styles [PR #194](https://github.com/storybooks/react-treebeard/pull/194)

### v3.2.1
- Fix merge styles broken on chrome v74 [PR #118](https://github.com/storybooks/react-treebeard/pull/118)

### v3.2.0
- Fix active link [PR #147](https://github.com/storybooks/react-treebeard/pull/147)
- Fix not change toggle when animations are false [PR #174](https://github.com/storybooks/react-treebeard/pull/174)
- Upgrade dependencies and change Component to PureComponent [PR #168](https://github.com/storybooks/react-treebeard/pull/168)
- Move components to different directories and upgrade @emotion/styles dependency [PR #178](https://github.com/storybooks/react-treebeard/pull/178)

### v2.1.0
- Add `React 16.0` to peerDependencies [PR #102](https://github.com/alexcurtis/react-treebeard/pull/102)

### v2.0.3
- Update `.babelrc` to fix some issues with Travis CI [PR #83](https://github.com/alexcurtis/react-treebeard/pull/83)

### v2.0.2
- Update Babel, Webpack, Mocha & Karma dependencies
- Fix ESLint issue

### v2.0.1
- Fix bug where package wasn't exported properly [PR #67 (comment)](https://github.com/alexcurtis/react-treebeard/pull/67#issuecomment-312475622)

### v2.0.0
- **BREAKING:** The `peerDependencies` range (for both `react` & `react-dom`)has been changed from `^0.14 || ^15.0` to `^15.5.4`.
- Uses `prop-types` package instead of `React.PropTypes`
    - Fixes dependencies for `velocity-react` & `radium`
- Uses ES6 classes instead of `React.createClass` in tests
- Uses `react-dom/test-utils` package instead of `react-addons-test-utils` in tests
- Some code clean-up`
- Deletes deprecated tests (`reactid` isn't used anymore since `React v15.0`)

### v1.1.0
- **BREAKING:** [Toggle is now completely data-driven.](https://github.com/alexcurtis/react-treebeard/issues/14) There is no self-aware state.
- Node Headers are now optimised via `shouldComponentUpdate`. This cuts down render time with large trees.
- [Container Decorator Available](https://github.com/alexcurtis/react-treebeard/issues/9). Increased flexibility by allowing you to create your own node containers. Found in `decorators.Container`.
- [Turn Off All Animations](https://github.com/alexcurtis/react-treebeard/issues/15). This will remove all Velocity components from the tree. Simply set `animations` to `false` in the props.

### v1.0.14
- [Derived Terminal Attribute](https://github.com/alexcurtis/react-treebeard/issues/11)
- Optional `id` can be defined in data and used as a component key.

### v1.0.13
- Remove Hyperlink. Reverted ES-Lint Script Reporting.

### v1.0.12
- [# HRef Fix](https://github.com/alexcurtis/react-treebeard/issues/6)

### v1.0.11
- [Support for Multiple Nodes @ Root Level](https://github.com/alexcurtis/react-treebeard/issues/4)
- Fixed non-critical animation errors in tests.

### v1.0.10
- [Support for NPM 2.x](https://github.com/alexcurtis/react-treebeard/issues/1)

### v1.0.9
- Initial Release
