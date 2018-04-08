import { AddTodoViewProps, AddTodoViewSfc } from '../presenters/AddTodoView';
import { AppData, appState, ToDo } from '../AppState';
import { Action, ContainerComponent, getCrudCreator, StateObject } from 'manifold-dx';
import { GenericContainerMappingTypes } from 'manifold-dx/dist/src/components/ContainerComponent';
import { CrudActionCreator } from 'manifold-dx/dist/src/actions/actionCreators';

export interface AddTodoProps { }

export class AddTodo extends ContainerComponent<AddTodoProps, AddTodoViewProps, AppData & StateObject> {

  private crudCreator: CrudActionCreator<AppData & StateObject>;

  public updateViewProps(executedActions: Action[]): void { return; }

  constructor(props: AddTodoProps) {
    super(props, appState.getState(), AddTodoViewSfc);
    this.crudCreator = getCrudCreator(appState.getState());
  }

  /**
   * Create a new to-do, then use it to create an action to update the array of to-dos,
   * then perform the action.
   *
   * @param {string} text
   */
  public addTodo(text: string): void {
    let newTodo: ToDo = {text: text, active: true, completed: false, id: this.appData.todos.length};
    // replace the array immutably
    let newToDos: ToDo[] = [...this.appData.todos];
    newToDos.push(newTodo);
    let action = this.crudCreator.update('todos', newToDos);
    appState.getManager().actionPerform(action);
  }

  /**
   * We're only passing the view our {@link addTodo} function.
   * @returns {AddTodoViewProps}
   */
  public createViewProps(): AddTodoViewProps {
    return { addTodo: this.addTodo.bind(this) };
  }

  createMappingActions(): GenericContainerMappingTypes<AddTodoProps, AddTodoViewProps, AppData & StateObject>[] {
    return [];
  }
}