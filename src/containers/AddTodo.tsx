import { AddTodoView, AddTodoViewProps, AddTodoViewSfc } from '../presenters/AddTodoView';
import { AppData, appState, ToDo } from '../AppState';
import { Action, ActionId, ContainerComponent, MappingAction, StateCrudAction, StateObject } from 'manifold-dx';

export interface AddTodoProps { }

export class AddTodo extends ContainerComponent<AddTodoProps, AddTodoViewProps, AppData & StateObject> {

  public updateViewProps(executedActions: Action[]): void { return; }

  createMappingActions(): MappingAction<any, any, AddTodoProps, AddTodoViewProps, keyof AddTodoViewProps>[] {
    return [];
  }

  constructor(props: AddTodoProps) {
    super(props, appState.getState(), AddTodoViewSfc);
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
    let action = new StateCrudAction(ActionId.UPDATE_PROPERTY, this.appData, 'todos', newToDos);
    appState.getManager().actionPerform(action);
  }

  /**
   * We're only passing the view our {@link addTodo} function.
   * @returns {AddTodoViewProps}
   */
  public createViewProps(): AddTodoViewProps {
    return { addTodo: this.addTodo.bind(this) };
  }
  
  public createView(viewProps: AddTodoViewProps): AddTodoView {
    return new AddTodoView(this.viewProps);
  }
}