import React from 'react';
import { Layout } from 'components';

import { Button } from '@material-ui/core';

const IndexPage = () => {
  return (
    <Layout>
      <Button variant="contained" color="primary">
        Вызов
      </Button>
    </Layout>
  );
};

export default IndexPage;
