export default {
    map: function(children, mapper){
        if(!children){ return []; }
        if(!Array.isArray(children)){ children = [children]; }
        return children.map(mapper);
    },
    count: function(children){
        if(!children){ return 0; }
        if(!Array.isArray(children)){ return 1; }
        return children.length;
    },
    at: function(children, index){
        if(!children){ return; }
        if(!Array.isArray(children)){
            if(index > 0){ return; }
            if(index === 0){ return children; }
        }
        return children[index];
    }
};
