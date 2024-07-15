/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import UsuarioSerivce from '../services/UsuarioService'
import Cabecalho from "../components/layout/Cabecalho";
import Rodape from "../components/layout/Rodape";
import Loading from "../components/loading";

const usuarioService = new UsuarioSerivce()

export default function comAutorizacao(Componente) {
  const estaLogado = true;
  
  return (props) => {
    const router = useRouter();
    if(typeof window !== 'undefined'){
      if(!usuarioService.estaAutenticado()){
        router.replace('/');
        return null;
      }

      const usarioLogado = usuarioService.obterInformacoesDoUsarioLogado();
      
      return (
        <>
          <Cabecalho usarioLogado={usarioLogado}/>
          <Loading/>
          <Componente usarioLogado={usarioLogado} {...props} />
          <Rodape usarioLogado={usarioLogado}/>
        </>
      );
    }
    return null;
}}