import { useEffect, useState } from 'react';
import Feed from '../../../components/feed';
import comAutorizacao from '../../../hoc/comAutorizacao';
import { useRouter } from 'next/router';
import CabecalhoPerfil from '../../../components/cabecalhoPerfil';


function Perfil({usuarioLogado}) {
  const [usuario, setUsuario] = useState({});
  const router = useRouter();

  useEffect(async () =>{
    setUsuario({
      nome: 'Douglas'
    })
  }, [router.query.id]);

  return(
    <div className='paginaPerfil'>
      <CabecalhoPerfil
        usuarioLogado={usuarioLogado}
        usuario={usuario}
      />
      <Feed usarioLogado={usuarioLogado}/>
    </div>
  );
}

export default comAutorizacao(Perfil);