import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PageContactForm from './containers/PageContactForm/PageContactForm';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/new-contact" element={<PageContactForm/>}/>
      <Route path="/contact/edit/:id" element={<PageContactForm/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  );
};

export default App;