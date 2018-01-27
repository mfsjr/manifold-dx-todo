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

export class FilterLinkView extends React.PureComponent<FilterLinkViewProps, any> {

  constructor(props: FilterLinkViewProps) {
    super(props);
  }

  public render(): React.ReactNode {
    if (this.props.active) {
      return <span>{this.props.children}</span>;
    }
    return (
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          this.props.onClick();
        }}
      >
        {this.props.children}
      </a>
    );
  }
}
