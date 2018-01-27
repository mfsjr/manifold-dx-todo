import { VisibilityFilterId } from '../AppState';
import { FilterLink } from '../containers/FilterLink';
import * as React from 'react';
import { ReactNode } from 'react';

export function FooterSfc(props: {}): ReactNode {
  return (
    <p>
      Show:
      {' '}
      <FilterLink visibilityFilter={VisibilityFilterId.ShowAll}>
        All
      </FilterLink>
      {', '}
      <FilterLink visibilityFilter={VisibilityFilterId.ShowActive}>
        Active
      </FilterLink>
      {', '}
      <FilterLink visibilityFilter={VisibilityFilterId.ShowCompleted}>
        Completed
      </FilterLink>
    </p>
  );
}

export class Footer extends React.PureComponent {

  public render(): React.ReactNode {
    return (
      <p>
        Show:
        {' '}
        <FilterLink visibilityFilter={VisibilityFilterId.ShowAll}>
          All
        </FilterLink>
        {', '}
        <FilterLink visibilityFilter={VisibilityFilterId.ShowActive}>
          Active
        </FilterLink>
        {', '}
        <FilterLink visibilityFilter={VisibilityFilterId.ShowCompleted}>
          Completed
        </FilterLink>
      </p>
    );
  }
}