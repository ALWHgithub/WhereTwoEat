import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../screens/components/button'
import StdButtonBlue from '../screens/components/button'
import catButton from '../screens/components/button'

test('renders correctly', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', () => {
    const tree = renderer.create(<StdButtonBlue />).toJSON();
    expect(tree).toMatchSnapshot();
  });

test('renders correctly for true', () => {
  const tree = renderer.create(catButton(true,"name")).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly for false', () => {
  const tree = renderer.create(catButton(true,"false")).toJSON();
  expect(tree).toMatchSnapshot();
});