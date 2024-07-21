import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  );
};

export default App;