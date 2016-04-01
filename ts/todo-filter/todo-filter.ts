import {Pipe, PipeTransform} from 'angular2/core';
import {Todo} from '../todo-store/todo-store';
@Pipe({
  name: 'filterTodos',
  pure: false // very important
})
export class FilterTodos implements PipeTransform {
  transform(todos: Array<Todo>, args: string[]) {
    // valid Todos are 'completed' or 'active'
    if (args[0]=== 'completed' || args[0]==='active') {
        var completion: Boolean = args[0] == "completed";
        //console.log("completion: "+ completion)
        return todos.filter((todo: Todo)=> todo.completed == completion);

    }
    else
      return todos;
  }
}
