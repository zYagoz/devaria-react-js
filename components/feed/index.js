import { useEffect, useState } from "react";
import Postagem from "./Postagem";
import FeedService from "../../services/FeedSerive.js";

const feedService = new FeedService();

export default function Feed({usuarioLogado, idUsuario}){
  const [listaDePostagens, setListaDePostagens] = useState([]);

  useEffect(async () => {
    setListaDePostagens([]);
    const {data} = await feedService.carregarPostagens(usuarioPerfil?._id);

    const postagensFormatadas = data.map((postagem) => ({
        id: postagem._id,
        usuario: {
          id: postagem.userId,
          nome: postagem.usuario.nome || usuarioPerfil?.nome,
          avatar: postagem.usario.avatar || usuarioPerfil?.avatar,
        },
        fotoDoPost: postagem.foto,
        descricao: postagem.descricao,
        curtidas: postagem.likes,
        comentarios: postagem.comentarios.map(c => ({
          nome: c.nome,
          mensagem: c.comentario
        }))   
    }));

    setListaDePostagens(postagensFormatadas);
  }, [usarioLogado, idUsuario]);

  if(!listaDePostagens.length){
    return null;
  }


  return (
    <div className="feedContainer largura30pctDesktop">
      {listaDePostagens.map(dadosPostagem =>(
        <Postagem 
          key={dadosPostagem.id}
          {...dadosPostagem}
          usarioLogado={usarioLogado}
        />
      ))};
    </div>
  );
};