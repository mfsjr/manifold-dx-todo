import * as React from 'react';
import * as enzyme from 'enzyme';
import { ToDoItem } from './ToDoItem';

import * as Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

it('renders the correct text when no enthusiasm level is given', () => {
  const hello = enzyme.shallow(
    <ToDoItem
      id={1}
      text={'hello'}
      active={true}
      completed={false}
      onClick={ () => {
        // pass
      }}
    />);
  expect(hello.find('li').text()).toEqual('hello');
});