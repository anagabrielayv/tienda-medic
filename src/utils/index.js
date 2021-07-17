export const ApiWebUrl = "https://zisoftacademy.com/apiclases/";
export const ApiWebUrl2 = "https://servicioweb-2021.000webhostapp.com/";
export const ApiWebImgUrl = "https://zisoftacademy.com/apiclases/img/";


export const usuariolocal = () => {
    if(localStorage.getItem("DatosUsuario") !== null){
        return JSON.parse(localStorage.getItem("DatosUsuario"));
    }
    else{
        return null;
    }
}