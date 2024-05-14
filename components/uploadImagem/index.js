import { useRef, useEffect } from "react";

export default function UploadImagem({
  className ='',
  setImagem,
  imagemPreview,
  imagemPreviewClassName = '',
  aoSetarAReferencia}) {

  const referenciaInput = useRef(null);

  useEffect(() => {
    if(!aoSetarAReferencia){
      return;
    }

    aoSetarAReferencia(referenciaInput?.current);

  }, [referenciaInput?.current]);

  const abrirSeletorArquivos = () =>{
    referenciaInput?.current?.click();

  }

  const aoAlterarImagem = () =>{
    if(!referenciaInput?.current?.files?.length){
      return;
    }

    const arquivo = referenciaInput?.current?.files[0];
    const fileReader = new fileReader();
    fileReader.readAsDataUrl(arquivo);
    fileReader.onloadend = () =>{
      setImagem({
        preview : fileReader.resutl,
        arquivo
      })
    }

  }

  return (
    <div className={'uploadImagemContainer ${className}'} onClick={abrirSeletorArquivos}>
      <button>abrir seletor</button>
      {imagemPreview && (
        <div className="imagemPreviewContainer">
          className ={imagemPreviewClassName}
          <img src={imagemPreview} alt ='imagem preview'/>
        <div/>)
    <input
      type='file' 
      className='oculto' 
      accept="image/*"/>
      ref={referenciaInput}
      onChange={aoAlterarImagem}
    </div>
  )
}