import { ToDoListView, ToDoListViewProps } from '../presenters/ToDoListView';
import { AppData, appState, ToDo, VisibilityFilterId } from '../AppState';
import { ContainerComponent, StateObject, MappingAction, StateCrudAction, ActionId } from 'manifold-dx';

export interface ToDoListProps {}

const ToDoListViewGenerator = function(props: ToDoListViewProps): ToDoListView {
  return new ToDoListView(props);
};

export class ToDoList extends ContainerComponent<ToDoListProps, ToDoListViewProps, AppData & StateObject> {

  public static filterTodos(todos: Array<ToDo>, visibilityFilter: VisibilityFilterId) {
    switch (visibilityFilter) {
      case VisibilityFilterId.ShowCompleted:
        return todos.filter(t => t.completed);
      case VisibilityFilterId.ShowActive:
        return todos.filter(t => !t.completed);
      case VisibilityFilterId.ShowAll:
      default:
        return todos;
    }
  }

  constructor(containerProps: ToDoListProps) {
    super(containerProps, appState.getState(), undefined, ToDoListViewGenerator);
  }

  createMappingActions(): MappingAction<any, any, ToDoListProps, ToDoListViewProps, keyof ToDoListViewProps>[] {
    let todosMapping = this.createMapping(
      this.appData,
      'todos',
      'todos',
      this.updateVisibleTodos.bind(this)
    );
    let filterMapping = this.createMapping(
      this.appData,
      'visibilityFilter',
      'visibilityFilter',
      this.updateVisibleTodos.bind(this)
    );
    return [todosMapping, filterMapping];
  }

  public createViewProps(): ToDoListViewProps {
    return {
      todos: this.appData.todos,
      onClick: this.onClick.bind(this),
      visibilityFilter: this.appData.visibilityFilter
    };
  }

  protected updateVisibleTodos(action: StateCrudAction<any, any>): void {
    this.viewProps.todos = ToDoList.filterTodos(this.appData.todos, this.appData.visibilityFilter);
    this.viewProps.visibilityFilter = this.appData.visibilityFilter;
  }

  public onClick(index: number) {
    let newTodo = {...this.appData.todos[index]};
    newTodo.completed = !newTodo.completed;
    let newTodos = ToDoList.newArray(this.appData.todos, index, newTodo);
    let toggleAction = new StateCrudAction(ActionId.UPDATE_PROPERTY, this.appData, 'todos', newTodos);
    appState.getManager().actionPerform(toggleAction);
  }
}