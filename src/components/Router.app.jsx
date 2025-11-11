// Hooks
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import { Nav } from './nav';
import { Home } from './../home/components/Home';
import { ModelerApp } from "./../modeler/components/Modeler.app";

export const RouterApp = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' 
          element={<Home />}
        />
        <Route path='/modeler' 
          element={<ModelerApp />}
        />
        <Route path='/new' 
          element={<ModelerApp />}
        />
      </Routes>
    </Router> 
  )
}
