'use strict';

// Helper: Get value by function or property name
function Getter(node, field, defaultValue){
    if(!field){
        return defaultValue;
    }
    else if(typeof field === 'function'){
        return field(node);
    }
    return node[field];
}

export default Getter;
