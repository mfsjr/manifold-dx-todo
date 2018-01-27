import * as React from 'react';
import { ReactNode } from 'react';
import { ReactElement } from 'react';

export interface AddTodoViewProps {
  addTodo: (newTodo: string) => void;
}

export function AddTodoViewSfc(props: AddTodoViewProps): ReactElement<AddTodoViewProps> {
    let input: HTMLInputElement;
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            props.addTodo(input.value);
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

export class AddTodoView extends React.PureComponent<AddTodoViewProps, any> {

  constructor(props: AddTodoViewProps) {
    super(props);
  }

  public render(): ReactNode {
    let input: HTMLInputElement;
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            this.props.addTodo(input.value);
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