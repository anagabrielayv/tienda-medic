import React, { Component } from 'react';

import { ApiWebUrl } from '../utils';

class Iniciosesion extends Component {


    constructor(props){
        super(props)
        this.state = {
            usuario: "",
            clave: "",
        }
    }

    componentDidMount(){
        console.log(this.context.usuario)
    }

    iniciarSesion(){
        const rutaServicio =  ApiWebUrl + "iniciarsesion.php";

        var formData = new FormData();
        formData.append("usuario", this.state.usuario)
        formData.append("clave", this.state.clave)

        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        } )
        .then(
            res => res.json()
            //Asi se indica que los valores que devuelve el servicio estarán en formato JSON
        )
        .then(
            (result) => {
                console.log(result);
                this.evaluarInicioSesion(result);
            }
        ) 
    }

    evaluarInicioSesion(result){
        if(result === -1) return alert("El usuario no existe");
        if(result === -2) return alert("La contraseña es incorrecta");

        alert("Bienvenido " + result[0].nombres);
        
        localStorage.setItem("DatosUsuario", JSON.stringify(result[0]))
        this.props.history.push("/escritorio");
    }

    registrese(){
        
    }


    render() {
        return (
            <section className="padded">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <h2>Inicio de sesión</h2>
                            <div className="mb-2">
                                <input type="text" className="form-control" placeholder="Usuario" 
                                    minLength="3" maxLength="15"
                                    onChange = { (e) => this.setState({usuario: e.target.value})} />
                            </div>
                            <div className="mb-2">
                                <input type="password" className="form-control" placeholder="Contraseña"
                                    minLength="3"
                                    onChange = { (e) => this.setState({clave: e.target.value})} />
                            </div>
                            <div className="mb-2">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick = {(e) => this.iniciarSesion()} >Iniciar sesión</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick = {(e) => this.registrese()} >Regístrese</button>                                    
                            </div>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Iniciosesion;