"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
console.log("dit is een test");
var root = document.getElementById('root');
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hello.prototype.render = function () {
        return React.createElement('div', null, "Hello " + this.props.toWhat);
    };
    return Hello;
}(React.Component));
ReactDOM.render(React.createElement(Hello, { toWhat: 'World' }, null), document.getElementById('root'));
//# sourceMappingURL=react.app.js.map