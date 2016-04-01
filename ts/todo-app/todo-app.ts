import {Component, EventEmitter, Inject} from 'angular2/core'
import {TodoStore, Todo} from '../todo-store/todo-store';
import {FocusDirective} from '../focus-directive/focus-directive';
import {FilterTodos} from '../todo-filter/todo-filter';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import { OnInit, OnChanges} from 'angular2/core';
import {OnActivate, CanReuse, OnReuse, ComponentInstruction} from 'angular2/router';
@Component({
    selector: 'todo-app',
    templateUrl: './html/todo-app.html',
    pipes: [FilterTodos],
    directives: [FocusDirective, ROUTER_DIRECTIVES]
})
export class TodoApp implements OnInit, CanReuse, OnReuse {
    newTodo: string;
    todoFilter: string;
    constructor(public todoStore: TodoStore, private routeParams: RouteParams) {
        /* TodoStore is not a registered provider in this component so
        TodoApp gets a copy of TodoRouter's TodoStore
        */
        console.log("Creating todo app");
    }

    ngOnInit() {
        this.todoFilter = this.routeParams.get('filter');

    }

    routerCanReuse(next : ComponentInstruction,prev : ComponentInstruction) {
      return true;
    }

    routerOnReuse(next : ComponentInstruction,prev : ComponentInstruction) {
      console.log("Reusing todoApp");
      this.todoFilter = next.params['filter'];
    }

    addTodo() {
        if (this.newTodo.trim()) {
            this.todoStore.add(this.newTodo);
            this.newTodo = '';
        }
    }
    editTodo(todo: Todo) {
        todo.editing = true;
    }

    updateTodo(todo: Todo, newTitle: String) {
        if (todo.editing) {
            console.log("Finished editing");
            if (newTitle !== undefined) {
                todo.title = newTitle
            }
            todo.editing = false;
            if (todo.title.length === 0)
                this.todoStore.remove(todo);
        }
    }

    stopEditing(todo: Todo, editedTitle: string) {
        todo.title = editedTitle;
        todo.editing = false;
        if (todo.title.length === 0)
            this.todoStore.remove(todo);

    }

    discardChanges(todo: Todo) {
        console.log("discardChanges")
        todo.editing = false;
    }

    toggleCompleted(todo: Todo) {
        todo.completed = !todo.completed;
    }
}
