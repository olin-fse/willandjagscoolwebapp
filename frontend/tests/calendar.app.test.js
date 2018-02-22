import React from 'react';
import ToDo from '../containers/ToDo.jsx';
import renderer from 'react-test-renderer';

test('Entry is removed when clicked', () => {
    const component = renderer.create(
        <ToDo/>,
      );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    //remove first event in to-do list
    tree.props.onRemoveTodo(0);
    //re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});