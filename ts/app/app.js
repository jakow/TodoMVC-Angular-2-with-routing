System.register(['../todo-app/todo-app', 'angular2/platform/browser'], function(exports_1) {
    "use strict";
    var todo_app_1, browser_1;
    return {
        setters:[
            function (todo_app_1_1) {
                todo_app_1 = todo_app_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(todo_app_1.TodoApp);
        }
    }
});
//# sourceMappingURL=app.js.map
