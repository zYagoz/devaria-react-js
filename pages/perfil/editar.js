import { useRouter } from 'next/router';
import CabecalhoComAcoes from '../../components/cabecalhoComAcoes';
import comAutorizacao from '../../hoc/comAutorizacao'
import UploadImagem from '../../components/uploadImagem';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import UsariosService from '../../services/UsuarioService';

import imgAvatarPadrao from '../../public/imagens/avatar.svg';
import imgLimpar from '../../public/imagens/limpar.svg';
import { validarNome } from '../../utils/validadores';

function EditarPerfil({usuarioLogado}){
  const [avatar, setAvatar] = useState();   
  const [nome, setNome] = useState('');
  const [inputAvatar ,setInputAvatar] = useState(null);
  const router = useRouter();

  const usuarioService = new UsariosServicervice();

  useEffect(() => {
    if(!usuarioLogado){
      return;
    }
    setNome(usuarioLogado.nome);
    setAvatar({
      preview: usuarioLogado.avatar
    });
  }, [])

  const atualizarPerfil = async() =>{
    try {
      if(!validarNome(nome)){
        alert('Nome precisa de pelo menos 2 caracteres')
        return;
      }

      const corpoRequisicao = new FormData();
      corpoRequisicao.append('nome', nome)

      if(avatar.arquivo){
        corpoRequisicao.append('file', avatar.arquivo)
      }

      await usuarioService.atualizarPerfil(corpoRequisicao);
      localStorage.setItem('nome', nome);

      if(avatar.arquivo){
        localStorage.setItem('avatar', avatar.preview);
      }

      router.push('/perfil/eu')
      
    } catch (error) {
      alert('Erro ao editar perfil')
      
    }
  }

  const aoCancelarEdicao = () =>{
    router.push('/perfil/eu')
  }

  const abrirSeletorArquivos = () =>{
    inputAvatar?.click();
  }

  return (
    <div className='paginaEditarPerfil largura30pctDesktop'>
      <div className='conteudoPaginaEditarPerfil'>
        <CabecalhoComAcoes
          titulo={'Editar perfil'}
          aoClicarAcaoEsquerda={aoCancelarEdicao}
          textoEsquerda='Cancelar'
          elementoDireita={'Concluir'}
          aoClicarElementoDireita={atualizarPerfil}
        />
         <hr className='linhaDivisoria'/>

        <div className='edicaoAvatar'>
          <UploadImagem
            setImagem={setAvatar}
            imagemPreview={avatar?.preview || imgAvatarPadrao.src}
            imagemPreviewClassName='avatar'
            aoSetarAReferencia={setInputAvatar}
          />
          <span onClick={abrirSeletorArquivos}>Alterar foto do perfil</span>
        </div>

        <hr className='linhaDivisoria'/>

        <div className='edicaoNome'>
          <label>nome</label>
          <input
            type='text'
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <Image
            src={imgLimpar}
            alt='icone limpar'
            width={16}
            height={16}
            onClick={() => setNome('')}
          
          />
        </div>

        <hr className='linhaDivisoria'/>
      </div>
    </div>
  );
}

export default comAutorizacao(EditarPerfil);