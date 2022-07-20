import React from 'react';
import renderer from 'react-test-renderer';
import {renderRating,renderRestrauntsText} from '../screens/components/RestaurantComponents'

test('test for whole number rating ', () => {
  const tree = renderer.create(
    renderRating(4)
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('test for non-whole number rating ', () => {
  const tree = renderer.create(
    renderRating(4.5)
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('test for no restaurants', () => {
  const tree = renderer.create(
    renderRestrauntsText([])
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('test for some restaurants', () => {
  const tree = renderer.create(
    renderRestrauntsText([0])
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
