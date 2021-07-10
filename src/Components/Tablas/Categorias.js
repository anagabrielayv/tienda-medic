import React, { Component } from 'react';
import { ApiWebUrl } from '../../utils';
import './Categorias.css';
import $ from "jquery/dist/jquery";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

class Categorias extends Component {
    constructor(props){
        super(props)
        this.state = {
            listaCategorias: [],
            nombre: "",
            apellido: "",
            distrito: "",
            profesion: "",

            categoriaSeleccionadaId: "",
            categoriaSeleccionadaNombre: "",
            categoriaSeleccionadaApellido: "",
            categoriaSeleccionadaDistrito: "",
            categoriaSeleccionadaProfesion: "",
        }
    }

    componentDidMount(){
        this.leerCategorias();
    }
    leerCategorias(){
        const rutaServicio =  ApiWebUrl + "person.php";

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

    dibujarTabla(datosTabla){
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Cod</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Distrito</th>
                        <th>Profesion</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datosTabla.map(itemCategoria =>
                    <tr key={itemCategoria.id}>
                        <td>{itemCategoria.id}</td>
                        <td>{itemCategoria.nombre}</td>
                        <td>{itemCategoria.apellido}</td>
                        <td>{itemCategoria.distrito}</td>
                        <td>{itemCategoria.profesion}</td>
                        <td><FontAwesomeIcon className="fa-pen" icon={faPen} 
                            onClick={() => this.mostrarFormularioActualizar(itemCategoria)}/></td>
                        <td><FontAwesomeIcon className="fa-times" icon={faTimes}
                            onClick={() => this.categoriaEliminar(itemCategoria)}/></td>
                    </tr>
                    )}    
                </tbody>
            </table>
        )
    }

    categoriaEliminar(itemCategoria){
        var respuesta = window.confirm("¿Esta seguro que desea eliminar la categoría " + itemCategoria.nombre + " ?");
        if(respuesta === true){
            const rutaServicio =  ApiWebUrl + "personeliminar.php";

            var formData = new FormData();
            formData.append("idcategoria", itemCategoria.id)

            fetch(rutaServicio, {
                method: 'POST',
                body: formData
            })
            .then(res => {
                alert("Se ha eliminado la categoría " + itemCategoria.nombre)
                this.leerCategorias();
                }
            ) 
        }

    }

    mostrarFormularioActualizar(itemCategoria){
        console.log(itemCategoria)
        this.setState({
            categoriaSeleccionadaId: itemCategoria.id,
            categoriaSeleccionadaNombre: itemCategoria.nombre,
            categoriaSeleccionadaApellido: itemCategoria.apellido,
            categoriaSeleccionadaDistrito: itemCategoria.distrito,
            categoriaSeleccionadaProfesion: itemCategoria.profesion
        })

        var myModal = new bootstrap.Modal(document.getElementById('modalActualizar'))
        myModal.show()
    }

    dibujarModal(){
        return(
            <div className="modal fade" id="modalActualizar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-2">
                            <input type="text" className="form-control" disabled
                                value={this.state.categoriaSeleccionadaId} />
                        </div>
                        <div className="mb-2">
                            <input type="text" className="form-control" placeholder="Nombre" 
                                required minLength="3" maxLength="15"
                                value={this.state.categoriaSeleccionadaNombre} 
                                onChange = { (e) => this.setState({categoriaSeleccionadaNombre: e.target.value})} />
                        </div>
                        <div className="mb-2">
                            <input type="text" className="form-control" placeholder="Descripción"
                                required minLength="3"
                                value={this.state.categoriaSeleccionadaApellido} 
                                onChange = { (e) => this.setState({categoriaSeleccionadaApellido: e.target.value})} />
                        </div>
                        <div className="mb-2">
                            <input type="text" className="form-control" placeholder="Descripción"
                                required minLength="3"
                                value={this.state.categoriaSeleccionadaDistrito} 
                                onChange = { (e) => this.setState({categoriaSeleccionadaDistrito: e.target.value})} />
                        </div>
                        <div className="mb-2">
                            <input type="text" className="form-control" placeholder="Descripción"
                                required minLength="3"
                                value={this.state.categoriaSeleccionadaProfesion} 
                                onChange = { (e) => this.setState({categoriaSeleccionadaProfesion: e.target.value})} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                            onClick = {(e) => this.categoriaActualizar()} >Actualizar</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    categoriaActualizar(){
        const rutaServicio =  ApiWebUrl + "personactualizar.php";

        var formData = new FormData();
        formData.append("id", this.state.categoriaSeleccionadaId)
        formData.append("nombre", this.state.categoriaSeleccionadaNombre)
        formData.append("apellido", this.state.categoriaSeleccionadaApellido)
        formData.append("distrito", this.state.categoriaSeleccionadaDistrito)
        formData.append("profesion", this.state.categoriaSeleccionadaProfesion)

        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        })
        .then(res => {
            alert("Actualizado correctamente")
            this.leerCategorias();
            }
        ) 
    }

    dibujarFormularioAgregar(){
        return(
            <div id="formulario-agregar">
                <form onSubmit={this.categoriasInsertar}>
                    <div className="mb-2">
                        <input type="text" className="form-control" placeholder="Nombre" id="txtNombre"
                        onChange = { (e) => this.setState({ nombre: e.target.value}) }
                        required minLength="3" maxLength="15"/>
                    </div>
                    <div className="mb-2">
                        <input type="text" className="form-control" placeholder="Apellido" id="txtApellido"
                        onChange = { (e) => this.setState({ apellido: e.target.value}) }
                        required minLength="3"/>
                    </div>
                    <div className="mb-2">
                        <input type="text" className="form-control" placeholder="Distrito" id="txtDistrito"
                        onChange = { (e) => this.setState({ distrito: e.target.value}) }
                        required minLength="3"/>
                    </div>
                    <div className="mb-2">
                        <input type="text" className="form-control" placeholder="Profesion" id="txtProfesion"
                        onChange = { (e) => this.setState({ profesion: e.target.value}) }
                        required minLength="3"/>
                    </div>
                    <div className="mb-2">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                        <button type="button" className="btn btn-primary" onClick={this.ocultarFormularioAgregar}>Cerrar</button>
                    </div>
                </form>
            </div>
        )
    }
    categoriasInsertar = (e) =>{
        e.preventDefault();

        const rutaServicio =  ApiWebUrl + "insertarperson.php";

        var formData = new FormData();
        formData.append("nombre", this.state.nombre)
        formData.append("apellido", this.state.apellido)
        formData.append("distrito", this.state.distrito)
        formData.append("profesion", this.state.profesion)

        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        } )
        .then(
            res => res.text()
            //Asi se indica que los valores que devuelve el servicio estarán en formato JSON
        )
        .then(
            (result) => {
                console.log(result);
                //La variable result contiene los datos que envia el servicio web
                alert("Se ha agregado una nueva categoría con el id: " + result);
                this.ocultarFormularioAgregar();
                this.leerCategorias();
                this.setState({ nombre: "" });
                this.setState({ apellido: "" }); 
                this.setState({ distrito: "" });
                this.setState({ profesion: "" }); 
                document.getElementById("txtNombre").value = ""
                document.getElementById("txtApellido").value = ""
                document.getElementById("txtDistrito").value = ""
                document.getElementById("txtProfesion").value = ""
            }
        ) 

    }
    ocultarFormularioAgregar = () => {
        //document.getElementById("formulario-agregar").style.display = "none";
        $("#formulario-agregar").slideUp('fast')
    }
    mostrarFormularioAgregar = () => {
        //document.getElementById("formulario-agregar").style.display = "block";
        $("#formulario-agregar").slideDown('fast')
    }
    render() {
        let contenidoCategorias = this.dibujarTabla(this.state.listaCategorias)
        let contenidoFormularioAgregar = this.dibujarFormularioAgregar();
        let contenidoModal = this.dibujarModal();
        return (
            <section id="tabla-categorias" className="padded">
                <div className="container">
                    <h1>Categorías - Pacientes</h1>
                    <div className="mb-2">
                        <button type="button" className="btn btn-primary" onClick={this.mostrarFormularioAgregar}>Nueva Busqueda</button>
                    </div>
                    {contenidoFormularioAgregar}                   
                    {contenidoCategorias}
                </div>
                {contenidoModal}
            </section>
        );
    }
}





export default Categorias;