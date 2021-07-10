import React, { Component } from 'react';
import { ApiWebUrl } from '../utils';

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

    obtenerProductoSolo(idproducto){
        const rutaServicio =  ApiWebUrl + "productosolo.php";

        var formData = new FormData();
        formData.append("idproducto", idproducto)
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

    agregarProductoCarrito(producto){
        var itemCarrito = {
            productoCarrito: producto,
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
                if(carrito[i].productoCarrito.idproducto === producto.idproducto){
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
                        <th>Cod</th>
                        <th>Nombres</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {datosCarrito.map(itemCarrito =>
                        <tr key={itemCarrito.productoCarrito.idproducto}>
                            <td>{itemCarrito.productoCarrito.idproducto}</td>        
                            <td>{itemCarrito.productoCarrito.nombre}</td>        
                            <td>{itemCarrito.productoCarrito.precio}</td>        
                            <td>{itemCarrito.cantidad}</td>        
                            <td>{itemCarrito.productoCarrito.precio * itemCarrito.cantidad}</td>        
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