import { Routes, Route, BrowserRouter } from 'react-router-dom';

import PageNotFound from './pages/PageNotFound';
import SomethinWentWrong from './pages/SomethingWentWrong';

import LicenseKeys from './pages/LicenseKeys';
import Create from './pages/LicenseKeys/Create';

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path='/something-went-wrong' element={<SomethinWentWrong />} />

        <Route path='/' element={<LicenseKeys/>} />
        <Route path='/create' element={<Create />} />

        {/* catch all */}
        <Route path='/page-not-found' element={<PageNotFound />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;