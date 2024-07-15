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
    obterUrlDaImageEAtualizarEstado(arquivo);
  }
  
  const obterUrlDaImageEAtualizarEstado = () =>{
    const fileReader = new fileReader();
    fileReader.readAsDataUrl(arquivo);
    fileReader.onloadend = () =>{
      setImagem({
        preview : fileReader.result,
        arquivo
      })
    }
    
  }

  const aoSoltarAImagem = () =>{
    e.preventDefault();
    if(e.dataTransfer.files & e.dataTransfer.files.length >0){
      const arquivo = e.dataTransfer.files[0];
      obterUrlDaImageEAtualizarEstado(arquivo);
    } 

  }

  return (
    <div className={'uploadImagemContainer ${className}'} 
      onDragOver={e => e.preventDefault()}
      onDrop={aoSoltarAImagem}
      onClick={abrirSeletorArquivos}
    >
      <button>abrir seletor</button>
      {imagemPreview && (
        <div className="imagemPreviewContainer">
          className ={imagemPreviewClassName}
          <img src={imagemPreview} alt ='imagem preview'/>
        </div>)}
    <input
      type='file' 
      className='oculto' 
      accept="image/*"/>
      ref={referenciaInput}
      onChange={aoAlterarImagem}
    </div>
  )
};