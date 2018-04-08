import { ToDoListView, ToDoListViewProps } from '../presenters/ToDoListView';
import { AppData, appState, ToDo, VisibilityFilterId } from '../AppState';
import { ContainerComponent, StateObject, StateCrudAction, getCrudCreator, getMappingCreator } from 'manifold-dx';
import { GenericContainerMappingTypes } from 'manifold-dx/dist/src/components/ContainerComponent';
import { CrudActionCreator } from 'manifold-dx/dist/src/actions/actionCreators';

export interface ToDoListProps {}

const ToDoListViewGenerator = function(props: ToDoListViewProps): ToDoListView {
  return new ToDoListView(props);
};

export class ToDoList extends ContainerComponent<ToDoListProps, ToDoListViewProps, AppData & StateObject> {

  private crudCreator: CrudActionCreator<AppData & StateObject>;

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
    this.crudCreator = getCrudCreator(this.appData);
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
    let toggleAction = this.crudCreator.update('todos', newTodos);
    appState.getManager().actionPerform(toggleAction);
  }

  createMappingActions(): GenericContainerMappingTypes<ToDoListProps, ToDoListViewProps, AppData & StateObject>[] {
    let mappingCreator = getMappingCreator(this.appData, this);
    return [
      mappingCreator.createMappingAction('todos', 'todos', this.updateVisibleTodos.bind(this)),
      mappingCreator.createMappingAction('visibilityFilter', 'visibilityFilter', this.updateVisibleTodos.bind(this))
    ];
  }
}