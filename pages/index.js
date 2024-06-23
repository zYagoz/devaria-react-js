import { useState, useRef, useEffect } from "react"
import Pessoa from "../components/pessoa"
import comAutorizacao from "../hoc/comAutorizacao"
import Botao from "../components/botao"
import Avatar from "../components/avatar"
import { UploadImagem } from "../components/uploadImagem"
import Login from "../components/login"
import UsuarioService from "../services/UsuarioService"
import Home from "../components/home"

const usuarioService = new UsuarioService();

function Index(){
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  useEffect(() => {
    setEstaAutenticado(
      usuarioService.estaAutenticado()
    );
  }, []);

  if(estaAutenticado === null){
    return null
  }
  
  if(estaAutenticado){
    return <Home/>;
  }

  return <Login aposAutenticacao={() => setEstaAutenticado(true)}/>
};

export default comAutorizacao(Home);