namespace am.repl {
    const fileContent = `
    this.$get=["$$animateJs","$$AnimateRunner",function(a,c){function d(c){return a(c.element,c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),t=d(a.to);if(b||t)return{start:function(){function a(){return function(){q(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());t&&d.push(t.start());c.all(d,function(a){g.complete(a)});var g=new c({end:a(),cancel:a()});return g}}}else return d(a)}}]}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map

    `;

 /////# sourceMappingURL=/g
 // TODO: flag "i"" toevoegen ?
    // const regex = new RegExp('//# sourceMappingURL=.*\.map', 'g');
    // const result = regex.test(fileContent);
    // console.log(result);

    // console.log(fileContent.replace(regex, "test"));

    const regex = /\/\/# sourceMappingURL=.*\.map/g;
    const result = regex.test(fileContent);
    console.log(result);

    console.log(fileContent.replace(regex, "test"));
}