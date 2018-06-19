import { ToDoListView, ToDoListViewProps } from '../presenters/ToDoListView';
import { AppData, appStore, ToDo, VisibilityFilterId } from '../AppStore';
import {
  ContainerComponent, StateObject, StateCrudAction, getMappingActionCreator, getArrayActionCreator } from 'manifold-dx';
import { AnyMappingAction } from 'manifold-dx/dist/src/actions/actions';

export interface ToDoListProps {}

const ToDoListViewGenerator = function(props: ToDoListViewProps): ToDoListView {
  return new ToDoListView(props);
};

/**
 * This implementation uses private state of visible todos, minimizing what's held in state.
 */
export class ToDoList extends ContainerComponent<ToDoListProps, ToDoListViewProps, AppData & StateObject> {

  private arrayActionCreator = getArrayActionCreator(this.appData, this.appData.todos);

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
    super(containerProps, appStore.getState(), undefined, ToDoListViewGenerator);
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
    let updateAction = this.arrayActionCreator.updateElement(index, newTodo);
    appStore.dispatch(
      updateAction,
      getArrayActionCreator(this.appData, this.appData.todos).rerenderArray()
    );
  }

  public appendToMappingActions(
    // let data: AppData & StateObject = this.appData;
    actions: AnyMappingAction[]): void {
    let data: AppData & StateObject = this.appData;
    let todosMapping = getMappingActionCreator(this.appData, 'todos')
      .createArrayIndexMappingAction(this.appData.todos, null, this, 'todos', this.updateVisibleTodos.bind(this));
    actions.push(todosMapping);
    let visibilityFilter = getMappingActionCreator(data, 'visibilityFilter')
      .createPropertyMappingAction(this, 'visibilityFilter', this.updateVisibleTodos.bind(this));
    actions.push(visibilityFilter);
  }
}