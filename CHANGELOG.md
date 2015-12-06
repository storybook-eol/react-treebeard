1.1.0
-------------------
#### Breaking Changes:
- [Toggle is now completely data-driven.](https://github.com/alexcurtis/react-treebeard/issues/14) There is no self-aware state.

#### Non-Breaking Changes:

- Node Headers are now optimised via `shouldComponentUpdate`. This cuts down render time with large trees.
- [Container Decorator Available](https://github.com/alexcurtis/react-treebeard/issues/9). Increased flexibility by allowing you to create your own node containers. Found in `decorators.Container`.
- [Turn Off All Animations](https://github.com/alexcurtis/react-treebeard/issues/15). This will remove all Velocity components from the tree. Simply set `animations` to `false` in the props.

1.0.14
-------------------
- [Derived Terminal Attribute](https://github.com/alexcurtis/react-treebeard/issues/11)
- Optional `id` can be defined in data and used as a component key.

1.0.13
-------------------
- Remove Hyperlink. Reverted ES-Lint Script Reporting.

1.0.12
-------------------
- [# HRef Fix](https://github.com/alexcurtis/react-treebeard/issues/6)

1.0.11
-------------------
- [Support for Multiple Nodes @ Root Level](https://github.com/alexcurtis/react-treebeard/issues/4)
- Fixed non-critical animation errors in tests.

1.0.10
-------------------
- [Support for NPM 2.x](https://github.com/alexcurtis/react-treebeard/issues/1)


1.0.9
-------------------
- Initial Release
