import { useNavigate } from 'react-router-dom';

import { Header } from '@/components';
import { Box } from '@mantine/core';

const DefaultLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <Box bg='primary.0' mih='100vh'>
      <Header />
      <main className="max-w-screen-xxl mx-auto">{children}</main>
    </Box>
  );
};

export default DefaultLayout;