import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './index.css';

import { BrowserRouter as Router, Route} from "react-router-dom";

import App from './App';
import reportWebVitals from './reportWebVitals';
import MainHeader from './Common/MainHeader';
import MainBar from './Common/MainBar';
import MainFooter from './Common/MainFooter';
import Nosotros from './Components/Nosotros';
import Colaboradores from './Components/Colaboradores';
import Empleados from './Components/Empleados';
import Tienda from './Components/Tienda';
import Categorias from './Components/Tablas/Categorias';
import Iniciosesion from './Components/Iniciosesion';
import Escritorio from './Components/Escritorio';
import Carrito from './Components/Carrito';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainHeader />
      <MainBar />
      <main id="main-content">
        <Route exact path="/" component={App} />
        <Route exact path="/nosotros" component={Nosotros} />
        <Route exact path="/colaboradores" component={Colaboradores} />
        <Route exact path="/empleados" component={Empleados} />
        <Route exact path="/tienda" component={Tienda} />
        <Route exact path="/categorias" component={Categorias} />
        <Route exact path="/iniciosesion" component={Iniciosesion} />
        <Route exact path="/escritorio" component={Escritorio} />
        <Route exact path="/carrito" component={Carrito} />
        <Route exact path="/carrito/:id" component={Carrito} />
      </main>
      <MainFooter />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
