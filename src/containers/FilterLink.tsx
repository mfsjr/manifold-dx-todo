import { FilterLinkViewProps, FilterLinkViewSfc } from '../presenters/FilterLinkView';
import { AppData, appState, VisibilityFilterId } from '../AppState';
import { ContainerComponent, StateObject, StateCrudAction, getCrudCreator, getMappingCreator } from 'manifold-dx';
import { GenericContainerMappingTypes } from 'manifold-dx/dist/src/components/ContainerComponent';
import { CrudActionCreator } from 'manifold-dx/dist/src/actions/actionCreators';

export interface FilterLinkProps {
  visibilityFilter: VisibilityFilterId;
}

export class FilterLink extends ContainerComponent<FilterLinkProps, FilterLinkViewProps, AppData & StateObject> {

  private crudCreator: CrudActionCreator<AppData & StateObject>;

  constructor(props: FilterLinkProps) {
    super(props, appState.getState(), FilterLinkViewSfc);
    this.crudCreator = getCrudCreator(appState.getState());
  }

  public onClick(): void {
    let visibilityAction = this.crudCreator.update('visibilityFilter', this.props.visibilityFilter);
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

  createMappingActions(): GenericContainerMappingTypes<FilterLinkProps, FilterLinkViewProps, AppData & StateObject>[] {
    let mappingCreator = getMappingCreator(this.appData, this);
    return [
      mappingCreator.createMappingAction('visibilityFilter', 'visibilityFilter', this.updateVisibilityFilter.bind(this))
    ];
  }
}