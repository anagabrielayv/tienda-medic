import React, { Component } from 'react';
import { ApiWebUrl } from '../utils';
import { ApiWebImgUrl } from '../utils';

import './Productos.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class Productos extends Component {
    constructor(props){
        super(props)
        this.state = {
            listaMedicinas: [],
            categoriaElegida: props.idEspecialidad
        }
        console.log("CONSTRUCTOR")
    }
    componentDidMount(){
        console.log("componentDidMount")
    }
    componentWillReceiveProps(props){
        console.log("componentWillReceiveProps")
        console.log(props);
        if(props.categoriaProducto.idEspecialidad){
            console.log(props.categoriaProducto.idEspecialidad)
            this.obtenerProductosPorCategoria(props.categoriaProducto.idEspecialidad)
        }
    }

    obtenerProductosPorCategoria = (idEspecialidad) => {
        const rutaServicio =  ApiWebUrl + "database_medicina.php";

        var formData = new FormData();
        formData.append("caty", idEspecialidad);

        fetch(rutaServicio,
            {
                method: 'POST',
                body: formData
            })
        .then(
            res => res.json()
            //Asi se indica que los valores que devuelve el servicio estarán en formato JSON
        )
        .then(
            (result) => {
                console.log(result);
                //La variable result contiene los datos que envia el servicio web
                this.setState({
                    listaMedicinas: result
                })
            }
        )
    }
    dibujarTabla(datosTabla){
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Imagen</th>
                        <th className="text-end">Teléfono</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datosTabla.map(itemProducto =>
                    <tr key={itemProducto.nombre}>
                        <td>{itemProducto.apellido}</td>
                        <td>{itemProducto.nombre}</td>
                        <td>{itemProducto.imagen}</td>
                        <td className="text-end">{parseFloat(itemProducto.telefono).toFixed(2)}</td>
                        <td>
                            <Link to={"/carrito/" + itemProducto.idEspecialidad}>
                                <FontAwesomeIcon className="fa-icon" icon={faShoppingBag}/>
                            </Link>      
                        </td>
                    </tr>
                    )}    
                </tbody>
            </table>
        )
    }

    dibujarCuadricula(datosTabla){
        return(
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {datosTabla.map(itemProducto =>
                    <div className="col"  key={itemProducto.idEspecialidad}>
                        <div className="card">
                        <img src={ApiWebImgUrl + itemProducto.imagen} className="card-img-top" alt= {itemProducto.nombre}
                            />
                        {/* style={{backgroundImage:'url(' + ApiWebUrl + itemProducto.imagengrande + ')'}} */}  
                        <div className={
                            itemProducto.enoferta === "0" ?
                            "productos-sin-oferta"
                            : "productos-con-oferta"
                        }>Oferta</div>   
                        <div className="card-body">
                            <h5 className="card-title">{itemProducto.nombre}</h5>
                            <h6 className="card-title">{itemProducto.apellido}</h6>
                            <h6 className="card-title">{itemProducto.imagen}</h6>
                            <h6 className="card-title">{itemProducto.telefono}</h6>
                     
                        </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    render() {
        console.log("render")
        let contenidoTabla = ""
        let contenidoCuadricula = ""
        if(this.state.listaMedicinas.length !== 0){
            contenidoTabla = this.dibujarTabla(this.state.listaMedicinas)
            contenidoCuadricula = this.dibujarCuadricula(this.state.listaMedicinas)
        }
        else{
            /* Reservado para mostrar todos los productos */
        }
        
        return (
            <div>
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="lista-tab" data-bs-toggle="tab" data-bs-target="#lista" type="button" role="tab" aria-controls="lista" aria-selected="true">Lista</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="cuadricula-tab" data-bs-toggle="tab" data-bs-target="#cuadricula" type="button" role="tab" aria-controls="cuadricula" aria-selected="false">Cuadrícula</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="lista" role="tabpanel" aria-labelledby="lista-tab">
       {contenidoTabla}
  </div>
  <div class="tab-pane fade" id="cuadricula" role="tabpanel" aria-labelledby="cuadricula-tab">
       {contenidoCuadricula}
  </div>

</div>
               
            </div>
        );
    }
}

export default Productos;