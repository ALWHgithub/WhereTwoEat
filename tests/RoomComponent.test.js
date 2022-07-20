import React from 'react';
import renderer from 'react-test-renderer';
import {renderLoading,renderCountPrice} from '../screens/components/RoomComponents'
let room = {"1": 0, "2": 0,"3": 0,"4": 1,"4srvQA39Pif9Eipe1ISJovTJ0u63":  [4,"Italian",],"Chinese": 0,"Italian": 1,"Japanese": 0,"Others": 0,"lat": 0,"long": 0,
"name": "Aaron11","num": 0,"term": " ",}


test('test for true ', () => {
    const tree = renderer.create(
        renderLoading(true)
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

test('test for true ', () => {
const tree = renderer.create(
     renderLoading(false)
    ).toJSON();
expect(tree).toMatchSnapshot();
});

test('test for undefined ', () => {
    const tree = renderer.create(
         renderLoading(undefined)
        ).toJSON();
    expect(tree).toMatchSnapshot();
    });

test('test for data ', () => {
        const tree = renderer.create(
             renderLoading(room)
            ).toJSON();
        expect(tree).toMatchSnapshot();
    });
