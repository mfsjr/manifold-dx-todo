import { State } from 'manifold-dx';

export enum VisibilityFilterId {
  ShowAll,
  ShowCompleted,
  ShowActive
}

export interface ToDo {
  text: string;
  completed: boolean;
  active: boolean;
  id: number;
}

export interface AppData {
  todos: ToDo[];
  visibilityFilter: VisibilityFilterId;
}

let appData = {
  todos: [] as ToDo[],
  visibilityFilter: VisibilityFilterId.ShowAll
};

export const appState = new State(appData, {});