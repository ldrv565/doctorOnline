import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Loader = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

Loader.propTypes = {
  children: PropTypes.node
};

export default Loader;
