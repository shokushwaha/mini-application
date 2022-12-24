import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home'
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration';
import Errorpage from './Components/Error Page/Errorpage';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
         <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/registration' element={<Registration />} />
          <Route path='*' element={<Errorpage/>} />

        </Routes> 


      </BrowserRouter>

    </>


  );
}

export default App;
