import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/header.jsx';
import Body from './components/body.jsx';
import Footer from './components/footer.jsx';
import List from './views/list.jsx';
import Search from './views/search.jsx';
import Homepage from './views/homepage.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter> 
        <> 
        <Header></Header>
          <Routes> 
                <Route path='/heroes' element={<Homepage/>}/>
                <Route path='/heroes/search' element={<Search/>}/>
                <Route path='/heroes/list' element={<List/>}/>
          </Routes>

            
        <Body></Body>
        
        <Footer></Footer>
        </> 
    </BrowserRouter>
  )}
export default App;
