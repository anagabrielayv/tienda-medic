import React, { Component } from 'react';
import { ApiWebUrl } from '../utils';
import Productos from './Productos';

class Tienda extends Component {
    constructor(props){
        super(props)
        this.state = {
            listaCategorias: [],
            categoriaSeleccionada: ""
        }
    }
    componentDidMount(){
        const rutaServicio =  ApiWebUrl + "database_especialidad.php";

        fetch(rutaServicio)
        .then(
            res => res.json()
            //Asi se indica que los valores que devuelve el servicio estarán en formato JSON
        )
        .then(
            (result) => {
                console.log(result);
                //La variable result contiene los datos que envia el servicio web
                this.setState({
                    listaCategorias: result
                })
            }
        )
    }

    dibujarCategorias(datosTabla){
        return(
            <ul className="list-group">
                {datosTabla.map(itemCategoria =>
                    <li className="list-group-item" key={itemCategoria.idEspecialidad}
                        onClick={() => this.seleccionarCategoria(itemCategoria)}
                        id={"li-categoria-" + itemCategoria.idEspecialidad}>
                        <h5>{itemCategoria.nombre}</h5>
                        <small>{itemCategoria.descripcion}</small>
                    </li>
                )}    
            </ul>
        )
    }
    async seleccionarCategoria(itemCategoria){
        console.log(itemCategoria)
        if(this.state.categoriaSeleccionada !== ""){    
            document.getElementById("li-categoria-" + this.state.categoriaSeleccionada.idEspecialidad).classList.remove("active");
        }
        this.setState({
            categoriaSeleccionada: itemCategoria
        })
        document.getElementById("li-categoria-" + itemCategoria.idEspecialidad).classList.add("active");
       
        }

    render() {
        let contenidoCategorias = this.dibujarCategorias(this.state.listaCategorias)
        let dibujarComponenteProductos = <Productos categoriaProducto={this.state.categoriaSeleccionada}/>
        return (
                <section id="tienda" className="padded">
                <div className="container">
                    <h1>Especialidad De Doctores</h1>
                    <div className="row">
                        <div className="col-md-3">
                            {contenidoCategorias}
                        </div>    
                        <div className="col-md-9">
                            <h4>{this.state.categoriaSeleccionada.nombre}</h4>
                            <small>{this.state.categoriaSeleccionada.descripcion}</small>
                            {dibujarComponenteProductos}
                        </div>                
                    </div>
                </div>
            </section>
        );
    }
}

export default Tienda;