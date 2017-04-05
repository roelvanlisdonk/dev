var am;
(function (am) {
    var repl;
    (function (repl) {
        var fileContent = "\n    this.$get=[\"$$animateJs\",\"$$AnimateRunner\",function(a,c){function d(c){return a(c.element,c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),t=d(a.to);if(b||t)return{start:function(){function a(){return function(){q(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());t&&d.push(t.start());c.all(d,function(a){g.complete(a)});var g=new c({end:a(),cancel:a()});return g}}}else return d(a)}}]}])})(window,window.angular);\n//# sourceMappingURL=angular-animate.min.js.map\n\n    ";
        var regex = /\/\/# sourceMappingURL=.*\.map/g;
        var result = regex.test(fileContent);
        console.log(result);
        console.log(fileContent.replace(regex, "test"));
    })(repl = am.repl || (am.repl = {}));
})(am || (am = {}));
//# sourceMappingURL=repl.js.map