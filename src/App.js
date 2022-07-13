import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AddUserDetails from './AddUserDetails/index'
import FindUserDetails from './FindUserDetails/index'

import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AddUserDetails/>}/>
      <Route path="/userdetails" element={<FindUserDetails/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
