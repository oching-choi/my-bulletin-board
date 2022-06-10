import './App.css';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Board from './components/Board';

function App() {
  let navigate = useNavigate();

  return (
    <div className='wrapper'>
       <Header/>
       <main>
          <Routes>
            <Route path="/" element={ <Login/> } />
            <Route path="/Board" element={ <Board/> } />
            <Route path="/Register" element={ <Register/> } />
          </Routes>
       </main>
    </div>
  )
}

export default App;
