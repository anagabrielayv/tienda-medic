import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';

function MainBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">         
  <div className="container">
    <a className="navbar-brand" href="/">Home</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="/#noticias">Noticias</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/#oficinas">Oficinas</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/#envios">Envíos</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/nosotros">Nosotros</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/colaboradores">Colaboradores</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/empleados">Empleados</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tienda">Doctores</Link>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categorías
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="/categorias">Pacientes</Link></li>
            <li><a className="dropdown-item" href="/">Proveedores</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="/">Empresas envíos</a></li>
            <li><a className="dropdown-item" href="/">Empleados</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="/">Clientes</a></li>
          </ul>
        </li>
      </ul>
      <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/iniciosesion">
            <FontAwesomeIcon className="fa-user" icon={faUser} />
          </Link>
        </li>
      </ul>  
    </div>
  </div>
</nav>
    );
}

export default MainBar;