import { FilterLinkViewProps, FilterLinkViewSfc } from '../presenters/FilterLinkView';
import { AppData, appState, VisibilityFilterId } from '../AppState';
import { ContainerComponent, StateObject, MappingAction, StateCrudAction, ActionId } from 'manifold-dx';

export interface FilterLinkProps {
  visibilityFilter: VisibilityFilterId;
}

export class FilterLink extends ContainerComponent<FilterLinkProps, FilterLinkViewProps, AppData & StateObject> {

  constructor(props: FilterLinkProps) {
    super(props, appState.getState(), FilterLinkViewSfc);
  }

  createMappingActions(): MappingAction<any, any, FilterLinkProps, FilterLinkViewProps, keyof FilterLinkViewProps>[] {
    let visibilityMapping = this.createMapping(
      this.appData,
      'visibilityFilter',
      'visibilityFilter',
      this.updateVisibilityFilter.bind(this)
    );
    return [visibilityMapping];
  }

  public onClick(): void {
    let visibilityAction = new StateCrudAction(
      ActionId.UPDATE_PROPERTY, this.appData,
      'visibilityFilter', this.props.visibilityFilter);
    appState.getManager().actionPerform(visibilityAction);
  }

  public createViewProps(): FilterLinkViewProps {
    let viewProps: FilterLinkViewProps = {
      children: this.props.children,
      visibilityFilter: this.props.visibilityFilter,
      onClick: this.onClick.bind(this),
      active: this.props.visibilityFilter === this.appData.visibilityFilter
    };
    return viewProps;
  }

  public updateVisibilityFilter(action: StateCrudAction<any, any>) {
    this.viewProps.active = this.props.visibilityFilter === this.appData.visibilityFilter;
  }
}