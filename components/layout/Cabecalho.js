import Image from 'next/image';
import logoHorizontal from '../../public/imagens/logoHorizontal.svg';
import imagemLupa from '../../public/imagens/lupa.svg';
import Navegacao from './navegacao';
import { useState } from 'react';
import ResultadoPesquisa from './ResultadoPesquisa';
import UsuarioService from '../../services/UsuarioService'
import { useRouter } from 'next/router';

const usuarioService = new UsuarioService()

export default function Cabecalho() {
  const [resultadoPequisa, setresultadoPequisa] = useState([]);
  const [termoPesquisado, setTermoPesquisado] = useState('');
  const router = useRouter();

  let cabecalhoClassName = '';
  if(window && window.location.pathname !== '/'){
    cabecalhoClassName = 'desktop';
  }

  const aoPesquisar = async (e) => {
    setTermoPesquisado(e.target.value);
    setTermoPesquisado([]);

    if(termoPesquisado.length < 3) {
      return;
    }

    try {
      const {data} = await usuarioService.pesquisar(termoPesquisado);
      setresultadoPequisa(data);
      
    } catch (error) {
      alert('Erro ao pesquisar usuário' + error?.response?.data?.erro);
      
    }
  }

  const aoClilcarResultadoPesquisa = () =>{
    setresultadoPequisa([]);
    setTermoPesquisado('');
    router.push('/perfil/${id}')
  }

  const redirecionarParaHome = () => {
    router.push('/');
  }

  return (
    <header className={`cabecalhoPrincipal ${cabecalhoClassName}`}>
      <div className='conteudoCabecalhoPrincipal'>
        <div className='logoCabecalhoPrincipal'>
          <Image
            onClick={redirecionarParaHome}
            src={logoHorizontal}  
            alt='Logo Devagram'
            layout='fill'
          />
        </div>

        <div className='barraPesquisa'>
          <div className='containerImagemLupa'>
            <Image
              src={imagemLupa}
              alt='Icone Lupa'
              layout='fill'
            />
          </div>

          <input
            type='text'
            placeholder='Pesquisar'
            value={termoPesquisado}
            onChange={aoPesquisar}/>
        </div>

        <Navegacao className='desktop'/>
      </div>

      {resultadoPequisa.length > 0 && (
        <div className='resultadoPesquisaContainer'>
          {resultadoPequisa.map(r => (
            <ResultadoPesquisa
              avatar ={r.avatar}
              name = {r.nome}
              email={r.email}
              key={r._id}
              id={r._id}
              onClick={aoClilcarResultadoPesquisa}
            />
          ))}
        </div>
      )}


    
    </header>
  )

}