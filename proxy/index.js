var person = {
    name: "张三"
};

var proxy = new Proxy(person, {
    get: function (target, propKey) {
        if (propKey in target) {
            return target[propKey];
        } else {
            throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
        }
    }
});