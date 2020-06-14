import * as React from 'react';
import { AppData, appStore, VisibilityFilterId } from '../AppStore';
import { ContainerComponent, StateObject, StateCrudAction, getActionCreator,
  getMappingActionCreator } from 'manifold-dx';
import { AnyMappingAction } from 'manifold-dx/dist/src/actions/actions';

export interface FilterLinkProps {
  visibilityFilter: VisibilityFilterId;
}

export interface FilterLinkViewProps extends FilterLinkProps {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}

export class FilterLink extends ContainerComponent<FilterLinkProps, FilterLinkViewProps, AppData & StateObject> {

  constructor(props: FilterLinkProps) {
    super(props, appStore.getState());
    this.viewProps = this.createViewProps();
  }

  public onClick(): void {
    getActionCreator(this.appState).set('visibilityFilter', this.props.visibilityFilter).dispatch();
  }

  public createViewProps(): FilterLinkViewProps {
    let viewProps: FilterLinkViewProps = {
      children: this.props.children,
      visibilityFilter: this.props.visibilityFilter,
      onClick: this.onClick.bind(this),
      active: this.props.visibilityFilter === this.appState.visibilityFilter
    };
    return viewProps;
  }

  public updateVisibilityFilter(action: StateCrudAction<any, any>) {
    this.viewProps.active = this.props.visibilityFilter === this.appState.visibilityFilter;
  }

  protected appendToMappingActions(
    mappingActions: AnyMappingAction[]): void {
    let mappingCreator = getMappingActionCreator(this.appState, 'visibilityFilter');
    let action = mappingCreator.createPropertyMappingAction(
      this, 'visibilityFilter', this.updateVisibilityFilter.bind(this));

    mappingActions.push(action);
  }
  public render() {
    if (this.viewProps.active) {
      return <span>{this.viewProps.children}</span>;
    }
    return (
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          this.viewProps.onClick();
        }}
      >
        {this.viewProps.children}
      </a>
    );
  }
}
