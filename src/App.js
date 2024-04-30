import './App.css';
import { auth, db } from './firebase';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup></Signup>}/>
          <Route path='dashboard' element={<Dashboard></Dashboard>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
