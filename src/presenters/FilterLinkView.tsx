import * as React from 'react';
import { FilterLinkProps } from '../containers/FilterLink';
import { ReactElement } from 'react';

export interface FilterLinkViewProps extends FilterLinkProps {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}

export function FilterLinkViewSfc(props: FilterLinkViewProps): ReactElement<FilterLinkViewProps> {
  if (props.active) {
    return <span>{props.children}</span>;
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        props.onClick();
      }}
    >
      {props.children}
    </a>
  );
}