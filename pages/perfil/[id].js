import { useEffect, useState } from 'react';
import Feed from '../../components/feed';
import comAutorizacao from '../../hoc/comAutorizacao';
import { useRouter } from 'next/router';
import CabecalhoPerfil from '../../components/cabecalhoPerfil';
import UsuarioService from "../../services/UsuarioService";

const usuarioService = new UsuarioService()

function Perfil({usuarioLogado}) {
  const [usuario, setUsuario] = useState({});
  const router = useRouter();
  const obterPerfil = async () =>{
    try {
      const {data} = await usuarioService.obterPerfil(
        estaNoPerfilPessoal()
          ? usuarioLogado.id
          : idUsuario
    );
      return data;
      
    } catch (error) {
      alert("Erro ao obter o perfil do usuário")
      
    }
  }

  const estaNoPerfilPessoal = () =>{
    return router.query.id === 'eu'

  }


  useEffect(async () =>{
    const dadosPerfil = await obterPerfil(router.query.id)
    setUsuario({dadosPerfil});
  }, [router.query.id]);

  return(
    <div className='paginaPerfil'>
      <CabecalhoPerfil
        usuarioLogado={usuarioLogado}
        usuario={usuario}
        estaNoPerfilPessoal={estaNoPerfilPessoal()}
        
      />
      <Feed 
        usarioLogado={usuarioLogado}
        idUsuario={usuario?._id}
      />
    </div>
  );
}

export default comAutorizacao(Perfil);