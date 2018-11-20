import { FilterLinkViewProps, FilterLinkViewSfc } from '../presenters/FilterLinkView';
import { AppData, appStore, VisibilityFilterId } from '../AppStore';
import { ContainerComponent, StateObject, StateCrudAction, getActionCreator,
  getMappingActionCreator } from 'manifold-dx';
import { AnyMappingAction } from 'manifold-dx/dist/src/actions/actions';

export interface FilterLinkProps {
  visibilityFilter: VisibilityFilterId;
}

export class FilterLink extends ContainerComponent<FilterLinkProps, FilterLinkViewProps, AppData & StateObject> {

  constructor(props: FilterLinkProps) {
    super(props, appStore.getState(), FilterLinkViewSfc);
  }

  public onClick(): void {
    getActionCreator(this.appState).update('visibilityFilter', this.props.visibilityFilter).dispatch();
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
}
