import React from 'react';
import { List as MuiList, ListItem } from '@material-ui/core';

const List = ({ data, renderItem }) => {
  return <MuiList>{data.map(renderItem)}</MuiList>;
};

List.Item = ListItem;

export default List;
