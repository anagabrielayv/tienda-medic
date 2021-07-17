import React, { Component } from 'react';
import { ApiWebUrl2 } from '../utils';

class Carrito extends Component {
    constructor(props){
        super(props)
        this.state = {
           itemsCarrito: []
        }
    }
    componentDidMount(){
        if(this.props.match.params.id != null){
            console.log(this.props.match.params.id);
            this.obtenerProductoSolo(this.props.match.params.id);
        }
    }

    obtenerProductoSolo(idEspecialidad){
        const rutaServicio =  ApiWebUrl2 + "database_doctores.php";

        var formData = new FormData();
        formData.append("idEspecialidad", idEspecialidad)
        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        } )
        .then(
            res => res.json()
        )
        .then(
            (result) => {
                console.log(result[0]);
                this.agregarProductoCarrito(result[0])
            }
        ) 
    }

    agregarProductoCarrito(especialidad){
        var itemCarrito = {
            productoCarrito: especialidad,
            cantidad: 1
        }
        let carrito = [];
        //localStorage.removeItem("carrito")

        if(localStorage.getItem("carrito") == null){
            carrito.push(itemCarrito);
        }
        else{
            carrito = JSON.parse(localStorage.getItem("carrito"));
            let index = -1;
            for(var i=0; i<carrito.length; i++){
                if(carrito[i].productoCarrito.idEspecialidad === especialidad.idEspecialidad){
                    index = i;
                    break;
                }
            }
            if(index === -1){
                carrito.push(itemCarrito);
            }
            else{
                let item = carrito[index];
                item.cantidad++;
                carrito[index] = item 
            } 

        }
        localStorage.setItem("carrito",JSON.stringify(carrito));
        this.setState({
            itemsCarrito: carrito
        })
    }

    dibujarCarrito(datosCarrito){
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>doctor</th>
                        <th>sede</th>
                        <th>telefono</th>
                        <th>especialidad</th>
                    </tr>
                </thead>
                <tbody>
                    {datosCarrito.map(itemCarrito =>
                        <tr key={itemCarrito.productoCarrito.id}>
                            <td>{itemCarrito.productoCarrito.id}</td>        
                            <td>{itemCarrito.productoCarrito.doctor}</td>        
                            <td>{itemCarrito.productoCarrito.sede}</td>        
                            <td>{itemCarrito.productoCarrito.telefono}</td>        
                            <td>{itemCarrito.productoCarrito.especialidad}</td>        
                        </tr>
                        )}
                </tbody>
            </table>
        )
    }

    vaciarCarrito(){
        localStorage.removeItem("carrito");
        this.setState({
            itemsCarrito: []
        })
    }    


    render() {
        let contenidoCarrito = this.dibujarCarrito(this.state.itemsCarrito)
        return (
            <section className="padded">
                <div className="container">
                    <h2>Carrito de compras</h2>
                    {contenidoCarrito}
                    <button type="button" className="btn btn-danger"
                        onClick={() => this.vaciarCarrito()}>
                        Vaciar carrito        
                    </button>
                </div>        
            </section>
        );
    }
}

export default Carrito;