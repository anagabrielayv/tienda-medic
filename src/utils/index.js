export const ApiWebUrl = "https://zisoftacademy.com/apiclases/";
export const ApiWebImgUrl = "https://zisoftacademy.com/apiclases/img/";


export const usuariolocal = () => {
    if(localStorage.getItem("DatosUsuario") !== null){
        return JSON.parse(localStorage.getItem("DatosUsuario"));
    }
    else{
        return null;
    }
}