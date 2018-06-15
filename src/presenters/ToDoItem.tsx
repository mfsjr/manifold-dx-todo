import { ToDo } from '../AppStore';
import * as React from 'react';
import { ReactNode } from 'react';

export interface ToDoViewProps extends ToDo {
  onClick: () => void;
}

export function ToDoItemSfc(props: ToDoViewProps): ReactNode {
  return (
    <li
      onClick={props.onClick}
      style={{ textDecoration: props.completed ? 'line-through' : 'none' }}
    >
      {props.text}
    </li>
  );
}

export class ToDoItem extends React.PureComponent<ToDoViewProps> {

  constructor(toDoProps: ToDoViewProps) {
    super(toDoProps);
  }

  public render() {
    return (
      <li
        onClick={this.props.onClick}
        style={{ textDecoration: this.props.completed ? 'line-through' : 'none' }}
      >
        {this.props.text}
      </li>
    );
  }
}