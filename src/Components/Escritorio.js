import React, { Component } from 'react';
import { usuariolocal } from '../utils';

class Escritorio extends Component {
    constructor(props){
        super(props)
        this.state = {
            usuario: null,
        }
    }

    componentDidMount(){
        const usuarioL = usuariolocal()
        console.log(usuarioL)
        if(usuarioL !== null){
            this.setState({
                usuario: usuarioL
            })
        }   
    }
    cerrarSesion(){
        localStorage.removeItem("DatosUsuario")
        this.setState({
            usuario: null
        })
        this.props.history.push("/");
    }

    render() {
        return (
            <section className="padded">
                <div className="container">
                    <h2>Escritorio</h2>
                    {this.state.usuario !== null ?
                        <div>
                            <h3>Hola {this.state.usuario.nombres}</h3>
                            <p>{this.state.usuario.empresa}</p>
                        </div>
                    :<div></div>}    
                    <button type="button" className="btn btn-primary"
                    onClick={(e) => this.cerrarSesion()}>
                        Cerrar sesión</button>   
                </div>        
            </section>
        );
    }
}

export default Escritorio;