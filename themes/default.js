'use strict';

export default {
    tree: {
        base: {
            listStyle: 'none',
            padding: 0
        },
        node: {
            base: {
                position: 'relative'
            },
            toggle: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginRight: '10px'
                },
                height: 24,
                width: 24,
                arrow: {
                    fill: 'red',
                    stroke: 'black',
                    strokeWidth: 1
                }
            },
            header: {
                base: {
                    display: 'inline-block'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '34px'
            }
        }
    }
};
