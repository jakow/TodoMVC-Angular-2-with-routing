import {Injectable} from "angular2/core";

@Injectable()
export class Todo {
    completed: Boolean;
    editing: Boolean;
    private _title: String;
    constructor(title: String) {
        this.completed = false;
        this.editing = false;
        this._title = title.trim();
    }

    get title() {
        return this._title;
    }

    set title(value: String) {
        this._title = value.trim();
    }
}

export class TodoStore {
    private STORAGE_IDL: String = 'angular2-todos';
    todos: Array<Todo> = [];
    constructor() {
        //add retrieval from localStorage?
        let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');
        this.todos = persistedTodos
            .map((todo: { _title: String, completed: Boolean }) => {
                let newTodo = new Todo(todo._title);
                newTodo.completed = todo.completed;
                return newTodo;
            }
            );
    }

    private updateStore() {
        localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
    }

    private filterByCompletion(completed: Boolean): Array<Todo> {
        return this.todos.filter((todo: Todo) => todo.completed === completed);
    }
    get length(): number {
        return this.todos.length;
    }

    setCompleted(todo: Todo, completed: Boolean): void {
        todo.completed = completed;
        this.updateStore();
        
    }

    toggleCompleted(todo: Todo): void {
        todo.completed = !todo.completed;
        this.updateStore();
    }

    removeCompleted(): void {
        this.todos = this.filterByCompletion(false);
        this.updateStore();
    }

    getCompleted(): Array<Todo> {
        return this.filterByCompletion(true);
    }

    setAllCompleted(completed: Boolean): void {
        this.todos.forEach((todo: Todo) => this.setCompleted(todo, completed));
    }

    allCompleted(): Boolean {
        return this.todos.length == this.getCompleted().length;
    }

    getRemaining(): Array<Todo> {
        return this.filterByCompletion(false);
    }

    add(title: String): void {
        this.todos.push(new Todo(title));
        this.updateStore();
    }

    remove(todo: Todo): void {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.updateStore();
    }
}
