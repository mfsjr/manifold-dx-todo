import { AddTodoViewProps, AddTodoViewSfc } from '../presenters/AddTodoView';
import { AppData, appStore, ToDo } from '../AppStore';
import { Action, ContainerComponent, getArrayActionCreator, StateObject } from 'manifold-dx';
import { AnyMappingAction } from 'manifold-dx/dist/src/actions/actions';

export interface AddTodoProps { }

export class AddTodo extends ContainerComponent<AddTodoProps, AddTodoViewProps, AppData & StateObject> {

  // private crudCreator = getActionCreator(this.appState);
  private arrayActionCreator = getArrayActionCreator(this.appState, this.appState.todos);

  public updateViewProps(executedActions: Action[]): void { return; }

  constructor(props: AddTodoProps) {
    super(props, appStore.getState(), AddTodoViewSfc);
  }

  /**
   * Create a new to-do, then use it to create an action to update the array of to-dos,
   * then perform the action.
   *
   * @param {string} text
   */
  public addTodo(text: string): void {
    let newTodo: ToDo = {text: text, active: true, completed: false, id: this.appState.todos.length};

    let actions = this.arrayActionCreator.insertElement(this.appState.todos.length, newTodo);
    appStore.dispatch(...actions);
  }

  /**
   * We're only passing the view our {@link addTodo} function.
   * @returns {AddTodoViewProps}
   */
  public createViewProps(): AddTodoViewProps {
    return { addTodo: this.addTodo.bind(this) };
  }

  appendToMappingActions(actions: AnyMappingAction[])
  : void {
    // no-op
  }
}