import React from 'react';
import styled from 'styled-components';

const List = ({ data, renderItem }) => {
  return <ListStyled>{data.map(renderItem)}</ListStyled>;
};

const ListStyled = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

export default List;
