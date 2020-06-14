import * as React from 'react';
import { AppData, appStore, ToDo } from '../AppStore';
import { Action, ContainerComponent, getArrayActionCreator, StateObject } from 'manifold-dx';
import { AnyMappingAction } from 'manifold-dx/dist/src/actions/actions';

export interface AddTodoProps { }

export interface AddTodoViewProps {
  addTodo: (newTodo: string) => void;
}

export class AddTodo extends ContainerComponent<AddTodoProps, AddTodoViewProps, AppData & StateObject> {

  // private crudCreator = getActionCreator(this.appState);
  private arrayActionCreator = getArrayActionCreator(this.appState, this.appState.todos);

  public updateViewProps(executedActions: Action[]): void { return; }

  constructor(props: AddTodoProps) {
    super(props, appStore.getState());
    this.viewProps = this.createViewProps();
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

  public render() {
    let input: HTMLInputElement;
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            this.viewProps.addTodo(input.value);
            input.value = '';
          }}
        >
          <input
            ref={(node: HTMLInputElement) => {
              input = node;
            }}
          />
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    );
  }
}
