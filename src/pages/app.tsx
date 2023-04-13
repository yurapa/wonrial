import { Outlet } from 'react-router-dom';

import Header from '../component/header/header';
import Footer from '../component/footer/footer';

const App = () => {
  return (
    <>
      <Header />

      <div className="main">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default App;
