import {TodoApp} from "../todo-app/todo-app";
import {TodoStore} from "../todo-store/todo-store";
import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

@Component( {
  selector: 'todo-router',
  directives: [TodoApp, ROUTER_DIRECTIVES],
  providers: [TodoStore],
  template: '<router-outlet></router-outlet>'
})
@RouteConfig([
  {path: '/:filter', name: 'TodoApp', component: TodoApp}
])
export class TodoRouter {
  public newTodo : string;
  constructor(private todoStore : TodoStore) {
    console.log("Creating todoStore");
  }

}
