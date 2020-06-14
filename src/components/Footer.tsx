import { VisibilityFilterId } from '../AppStore';
import { FilterLink } from './FilterLink';
import * as React from 'react';

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
