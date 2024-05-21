import { Fragment } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { PATHS, ROUTES } from '@/config';
import { Notifications } from '@mantine/notifications';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map((route, index) => {
          const Layout = route.layout || Fragment;
          const Page = route.element;
          
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;