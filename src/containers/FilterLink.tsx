import { FilterLinkViewProps, FilterLinkViewSfc } from '../presenters/FilterLinkView';
import { AppData, appStore, VisibilityFilterId } from '../AppStore';
import { ContainerComponent, StateObject, StateCrudAction, getActionCreator,
  getMappingActionCreator } from 'manifold-dx';
import { ActionCreator } from 'manifold-dx/dist/src/actions/actionCreators';
import { AnyMappingAction } from 'manifold-dx/dist/src/actions/actions';

export interface FilterLinkProps {
  visibilityFilter: VisibilityFilterId;
}

export class FilterLink extends ContainerComponent<FilterLinkProps, FilterLinkViewProps, AppData & StateObject> {

  private crudCreator: ActionCreator<AppData & StateObject>;

  constructor(props: FilterLinkProps) {
    super(props, appStore.getState(), FilterLinkViewSfc);
    this.crudCreator = getActionCreator(appStore.getState());
  }

  public onClick(): void {
    let visibilityAction = this.crudCreator.update('visibilityFilter', this.props.visibilityFilter);
    visibilityAction.process();
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

  protected appendToMappingActions(
    mappingActions: AnyMappingAction[]): void {
    let mappingCreator = getMappingActionCreator(this.appData, 'visibilityFilter');
    let action = mappingCreator.createPropertyMappingAction(
      this, 'visibilityFilter', this.updateVisibilityFilter.bind(this));

    mappingActions.push(action);
  }
}