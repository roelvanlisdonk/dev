(function (exports,_angular_core) {
    'use strict';

    function toSnakeCase() {
        console.log("app started!");
    }

    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    exports.AppComponent = class AppComponent {
    };
    exports.AppComponent = __decorate([
        _angular_core.Component({
            selector: 'my-app',
            template: '<h1>My First Angular 2 App</h1>'
        }), 
        __metadata('design:paramtypes', [])
    ], exports.AppComponent);
    function start() {
        console.log("app starte!!");
        toSnakeCase();
    }
    start();

    exports['default'] = start;

}((this.zvdz = this.zvdz || {}),_angular_core));
//# sourceMappingURL=bundle.js.map