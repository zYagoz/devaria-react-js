import imagemAvatar from "../public/imagens/avatar.svg";
import HttpService from "./HttpsService";

export default class UsariosService extends HttpService {
  async login (credenciais){
    const {data} = await this.post('/login', credenciais);

    localStorage.setItem("nome", data.nome);
    localStorage.setItem("email", data.email);
    localStorage.setItem("token", data.token);
    
    if(data.avatar){
      localStorage.setItem("avatar", data.avatar);

    }
    
  }

  async cadastro (dados) {
    return this.post('/cadastro', dados)

  }
}