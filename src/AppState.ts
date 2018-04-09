import { Store } from 'manifold-dx';

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

let appData: AppData = {
  todos: [] as ToDo[],
  visibilityFilter: VisibilityFilterId.ShowAll
};

export const appState = new Store(appData, {});