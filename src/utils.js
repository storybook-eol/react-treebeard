export default {
    map: function(children, mapper){
        if(!children){ return []; }
        if(!Array.isArray(children)){ children = [children]; }
        return children.map(mapper);
    },
};
