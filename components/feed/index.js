import { useEffect, useState } from "react";
import Postagem from "./Postagem";
import FeedService from "../../services/FeedSerive.JS";

const feedService = new FeedService();

export default function Feed({usarioLogado}){
  const [listaDePostagens, setListaDePostagens] = useState([]);

  useEffect(async () => {
    const {data} = await feedService.carregarPostagens();

    const postagensFormatadas = data.map(() => {
      {
        id: postagem._id,
        usuario: {
          id: postagem.userId,
          nome: postagem.usuario.nome,
          avatar postagem.usario.avatar
        },
        fotoDoPost: postagem.foto,
        descricao: postagem.descricao,
        curtidas: postagem.likes,
        comentarios: postagem.comentarios.map(c => ({
          nome: c.nome,
          mensagem: c.comentario
        }))
      }
    });

    setListaDePostagens(postagensFormatadas);
  }, [usarioLogado]);


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