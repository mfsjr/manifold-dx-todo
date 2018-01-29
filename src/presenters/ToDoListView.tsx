import * as React from 'react';
import { ToDo, VisibilityFilterId } from '../AppState';
import { ToDoItem } from './ToDoItem';

export interface ToDoListViewProps {
  todos: ToDo[];
  visibilityFilter: VisibilityFilterId;
  onClick: (index: number) => void;
}

export class ToDoListView extends React.PureComponent<ToDoListViewProps> {

  constructor(viewProps: ToDoListViewProps) {
    super(viewProps);
  }

  public render() {
    return (
      <ul>
        {this.props.todos.map((todo) => (
          <ToDoItem key={todo.id} {...todo} onClick={() => this.props.onClick(todo.id)} />
        ))}
      </ul>
    );
  }
}