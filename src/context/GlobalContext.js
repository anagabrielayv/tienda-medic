import { createContext, Component } from 'react';

export const GlobalContext = createContext();

export class GlobalProvider extends Component {

        state = {
            usuario: null
        }

    iniciarSesion = (usuario) =>{
        this.setState({
            ...this.state,
            usuario: usuario
        })
    }
    /*
    cerrarSesion(usuario){
        this.setState({
            usuario: null
        })
    }*/
    render() {
        return (
            <GlobalContext.Provider
            value = {{
                usuario: this.state.usuario,
                iniciarSesion: this.iniciarSesion,
                cerrarSesion: this.cerrarSesion
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        );
    }
}

