'use strict';

export default {
    id: 0,
    name: 'INSERT ROOT TITLE HERE',
    children: [
        {
            id: 1,
            name: 'CHILD',
            children: [
                {
                    id: 4,
                    name: 'CHILD 4',
                    terminal: true
                }
            ]
        },
        {
            id: 2,
            name: 'CHILD 2',
            // decorators: {
            //     Toggle: Toggle2,
            //     Header: Header
            // },
            // animations: animations,
            children: [
                {
                    id: 3,
                    name: 'CHILD 3',
                    loading: true
                }
            ]
        }
    ]
};
