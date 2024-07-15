import Image from 'next/image';

import imgHomeAtivo from '../../public/imagens/homeAtivo.svg';
import imgHomeCinza from '../../public/imagens/homeCinza.svg';
import imgPublicacaoAtivo from '../../public/imagens/PublicacaoAtivo.svg';
import imgPublicacaoCinza from '../../public/imagens/PublicacaoCinza.svg';
import imgUsuarioAtivo from '../../public/imagens/UsuarioAtivo.svg';
import imgUsuarioCinza from '../../public/imagens/UsuarioCinza.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const mapaDeRotas = {
  home: {
    imagemAtivo: imgHomeAtivo,
    rotasAtivacao: ['/'],
    imagemPadrao: imgHomeCinza
  },
  publicacao: {
    imagemAtivo: imgPublicacaoAtivo,
    rotasAtivacao: ['/publicacao'],
    imagemPadrao: imgPublicacaoCinza
  },
  perfil: {
    imagemAtivo: imgUsuarioAtivo,
    rotasAtivacao: ['/perfil/eu', 'perfil/editar'],
    imagemPadrao: imgUsuarioCinza
  }
}

export default function Navegacao({className}) {
  const [rotaAtiva, setRotaAtiva] = useState('home');
  const router = userRouter();

  useEffect(() => {
    definirRotaAtiva();
  }, [router.asPath]);

  const definirRotaAtiva = () => {
    const chavesDoMapaDeRotas = Object.keys(mapaDeRotas);
    const indiceAtivo = chavesDoMapaDeRotas.findIndex(chave => {
      return mapaDeRotas[chave].rotasAtivacao.includes(
        window.location.pathname
      )
    });

    if(indiceAtivo === -1){
      setRotaAtiva('home');
    } else{
      setRotaAtiva(chavesDoMapaDeRotas[indiceAtivo]);
    }
  }

  const obterImagem = () =>{
    const rotaAtivada = mapaDeRotas[nomeRota];

    if(rotaAtiva === nomeRota){
      return rotaAtivada.imagemAtivo
    }

    return rotaAtivada.imagemPadrao
  }

  const aoClicarNoIcone = (nomeRota) => {
    setRotaAtiva(nomeRota);
    router.push(mapaDeRotas[nomeRota].rotasAtivacao[0])
  }

  return (
    <nav className={'barraNavegacao ${className}'}>
      <ul>
        <li onClick={() => aoClicarNoIcone('home')}>
          <Image
            src={obterImagem('home')}
            alt='Icone Home'
            width={20}
            height={20}
          />
        </li>

        <li onClick={() => aoClicarNoIcone('publicacao')}>
          <Image
            src={obterImagem('publicacao')}
            alt='Icone Publicacao'
            width={20}
            height={20}
          />
        </li>

        <li onClick={() => aoClicarNoIcone('perfil')}>
          <Image
            src={obterImagem('perfil')}
            alt='Icone Usuário'
            width={20}
            height={20}
          />
        </li>
      </ul>

    </nav>

  );
}