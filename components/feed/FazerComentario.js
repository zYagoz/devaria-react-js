import { useState } from "react";
import Avatar from "../avatar";

export function FazerComentario({usuarioLogado, comentar}) {
  const [linhas, setLinhas] = useState(1);
  const [comentario, setComentario] = useState('');

  const aoDigitarComentario = (e) =>{
    const valorInput = e.target.value;
    setComentario(valorInput);
    setLinhas(valorInput.length > 0 ? 2 : 1);
  }

  const aoPressionarQualquerTecla = () =>{
    if(e.key === 'Enter'){
      FazerComentario()

    }
  }

  const FazerComentario = () =>{
    if (comentario.trim().length === 0 || !comentar){
      return
    }

   comentar(comentario);

  }

  return(
    <span>
      <div className="containerFazerComentario">
        <Avatar src={usuarioLogado.avatar}/>
        <textarea 
          rows={linhas}
          onChange={aoDigitarComentario}
          onKeyDown={aoPressionarQualquerTecla}
          value={comentario}
          placeholder="Adicionar comentário...">
        </textarea>

        <button 
          type="button"
          className="btnPublicacao desktop"
          onClick={FazerComentario}
        >
          Publicar
        </button>
      </div>
    </span>
  )
}