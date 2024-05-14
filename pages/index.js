import { useState, useRef } from "react"
import Pessoa from "../components/pessoa"
import comAutorizacao from "../hoc/comAutorizacao"
import Botao from "../components/botao"
import Avatar from "../components/avatar"
import { UploadImagem } from "../components/uploadImagem"
import Login from "../components/login"

function Index(){
 
  return (
    <>
      <Login/>
    </>
  )
};

export default comAutorizacao(Home);