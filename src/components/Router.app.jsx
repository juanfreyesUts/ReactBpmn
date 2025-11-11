// Hooks
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import { NavApp } from './Nav.app';
import { Home } from './../home/components/Home';
import { ViewerApp } from '../modeler/components/Viewer.app';
import { ModelerApp } from "./../modeler/components/Modeler.app";

export const RouterApp = () => {
  return (
    <Router>
      <NavApp />
      <Routes>
        <Route path='/' 
          element={<Home />}
        />
        <Route path='/viewer' 
          element={<ViewerApp />}
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
