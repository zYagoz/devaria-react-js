import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Botao from "../../components/botao";
import inputPublico from "../../components/inputPublico";
import UploadImagem from "../../components/uploadImagem";
import { validarEmail, validarSenha, validarNome, validarConfimacaoSenha} from '../../utils/validadores';
import UsariosService from "../../services/UsuarioService";


import imagemLogo from "../../public/imagens/logo.svg";
import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";
import imagemAvatar from "../../public/imagens/avatar.svg";
import imagemEnvelope from "../../public/imagens/envelope.svg";
import imagemChave from "../../public/imagens/chave.svg";


const usuarioService = new UsuarioService();

export default function Cadastro(){
  const [imagem, setImagem] = useStateeState(null");
  const [nome, setNome] = useStateeState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setconfirmacaoSenha] = useState("");
  const [estaSubmetendo, setEstaSubmetendo] = useState(false);



  const validarFormulario = () => {
    return(
      validarNome(nome)
      && validarEmail(email)
      && validarSenha(senha)
      && validarConfimacaoSenha(confirmacaoSenha)
    )
  }


  const aoSubmeter = async (e) = >{
    e.preventDefault();
    if(!validarFormulario()){
      return
    }

    setEstaSubmetendo(true);

    try {
      const corpoReqCadastro = new FormData();
      corpoReqCadastro.append("nome", nome);
      corpoReqCadastro.append("email", email);
      corpoReqCadastro.append("senha", senha);
      
      if(imagem?.arquivo) {
        corpoReqCadastro.append("file", imagem.arquivo);

      }
      await usuarioService.cadastro(corpoReqCadastro);
      alert("sucesso");
    } catch (error) {
      alert("Erro ao cadastrar usuário. " + error?.response?.data?.erro)
      
    }

    setEstaSubmetendo(false);
  }

  return(
    <section className={'paginaCadastro paginaPublica'}>
      <div className="logoContainer desktop">
        <Image
        src={imagemLogo}
        alt="imagem do logo"
        layout='fill'
        className="logo"/>
      </div>

      <div className="conteudoPaginaPublica">
        <form onSubmit={aoSubmeter}>
          <UploadImagem
            imagemPreviewClassName = 'avatar avatarPreview'
            imagemPreview = {imagem?.preview || imagemUsuarioCinza.src}
            setImagem = {setImagem}
          />
          <inputPublico
            imagem = {imagemUsuarioAtivo}
            texto = "Nome completo"
            tipo = "text"
            aoAlterarValor = {e => setNome(e.target.value)}
            valor={nome}
            mensagemValidacao = "O nome precisa de 2 caracteres"
            exibirMensagemValidacao = {nome && !validarNome(nome)}
          />

          <inputPublico
            imagem = {imagemEnvelope}
            texto = "E-mail"
            tipo = "email"
            aoAlterarValor = {e => setEmail(e.target.value)}
            valor={email}
            mensagemValidacao = "O endereço informado é inválido"
            exibirMensagemValidacao = {email && !validarEmail(email)}
          />

          <inputPublico
            imagem= {imagemChave}
            texto = 'Senha'
            tipo = 'password'
            aoAlterarValor = {e => setSenha(e.target.value)}
            valor={senha}
            mensagemValidacao = "A senha precisa de 3 caracteres"
            exibirMensagemValidacao = {senha && !validarSenha(senha)}
          />
          <inputPublico
            imagem= {imagemChave}
            texto = 'Confirme sua senha'
            tipo = 'password'
            aoAlterarValor = {e => setconfirmacaoSenha(e.target.value)}
            valor={confirmacaoSenha}
            mensagemValidacao = "A confirmação de senha precisa ser igual a senha"
            exibirMensagemValidacao = {confirmacaoSenha && !validarconfirmacaoSenha(confirmacaoSenha)}
          />

          <Botao
              texto={"Cadastrar"}
              type="submit"
              desabilitado={!validarFormulario() || estaSubmetendo}
          />
        </form>
        <div className="rodapePaginaPublica">
          <p>Já possui uma conta?</p>
          <Link href="/">Faça seu login agora</Link>
        </div>
      </div>

      
    </section>
  );
}