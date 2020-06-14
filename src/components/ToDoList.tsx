import * as React from 'react';
import { AppData, appStore, ToDo, VisibilityFilterId } from '../AppStore';
import {
  ContainerComponent, StateObject, StateCrudAction, getMappingActionCreator, getArrayActionCreator } from 'manifold-dx';
import { AnyMappingAction } from 'manifold-dx/dist/src/actions/actions';
import {ToDoItem} from "./ToDoItem";

export interface ToDoListProps {}

export interface ToDoListViewProps {
  todos: ToDo[];
  visibilityFilter: VisibilityFilterId;
  onClick: (index: number) => void;
}

/**
 * This implementation uses private state of visible todos, minimizing what's held in state.
 */
export class ToDoList extends ContainerComponent<ToDoListProps, ToDoListViewProps, AppData & StateObject> {

  private arrayActionCreator = getArrayActionCreator(this.appState, this.appState.todos);

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
    super(containerProps, appStore.getState());
    this.viewProps = this.createViewProps();
  }

  public createViewProps(): ToDoListViewProps {
    return {
      todos: this.appState.todos,
      onClick: this.onClick.bind(this),
      visibilityFilter: this.appState.visibilityFilter
    };
  }

  protected updateVisibleTodos(action: StateCrudAction<any, any>): void {
    this.viewProps.todos = ToDoList.filterTodos(this.appState.todos, this.appState.visibilityFilter);
    this.viewProps.visibilityFilter = this.appState.visibilityFilter;
  }

  public onClick(index: number) {
    let newTodo = {...this.appState.todos[index]};
    newTodo.completed = !newTodo.completed;
    let updateAction = this.arrayActionCreator.updateElement(index, newTodo);
    appStore.dispatch(
      updateAction,
      getArrayActionCreator(this.appState, this.appState.todos).rerenderArray()
    );
  }

  /**
   * Note that mappings let you define functinos that can be executed whenever updates from app state are performed.
   * @param actions
   */
  public appendToMappingActions(
    actions: AnyMappingAction[]): void {
    let data: AppData & StateObject = this.appState;
    let todosMapping = getMappingActionCreator(this.appState, 'todos')
      .createPropertyMappingAction(this, 'todos', this.updateVisibleTodos.bind(this));
    actions.push(todosMapping);
    let visibilityFilter = getMappingActionCreator(data, 'visibilityFilter')
      .createPropertyMappingAction(this, 'visibilityFilter', this.updateVisibleTodos.bind(this));
    actions.push(visibilityFilter);
  }

  public render() {
    return (
      <ul>
        {this.viewProps.todos.map((todo) => (
          <ToDoItem key={todo.id} {...todo} onClick={() => this.viewProps.onClick(todo.id)} />
        ))}
      </ul>
    );
  }
}
