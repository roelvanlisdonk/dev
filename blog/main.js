var blog;
(function (blog) {
    "use strict";
    function onActionButtonClick(text) {
        console.log("action button clicked! " + text);
    }
    blog.onActionButtonClick = onActionButtonClick;
    function preventClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }
    blog.preventClick = preventClick;
})(blog || (blog = {}));
//# sourceMappingURL=main.js.map