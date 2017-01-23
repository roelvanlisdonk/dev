var helloWorld = {
    id: "324234-d-32-4-dsfgsdf-432rsdgsdgf",
    onChange: function () {
    },
    value: "Hello world!"
};
var div = {
    deps: {
        helloWorld: helloWorld
    },
    name: "div",
    onChange: function () {
        this.text = this.deps.helloWorld.value;
    }
};
//# sourceMappingURL=temp.js.map