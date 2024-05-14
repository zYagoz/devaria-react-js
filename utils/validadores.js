const validarNome = (nome) => {
  return nome?.toString().length > 2;
}

const validarEmail = (email) =>{
  const emailStr = email?.toString();
  return emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.');
}

const validarSenha = (senha) => {
  const senhaStr = senha?.toString();
  return senhaStr.length >= 3 ;
}


const validarConfimacaoSenha = (senha, confirmacaoSenha) => {
  return validarSenha(senha) && senha === confirmacaoSenha;
}

export {
  validarNome,
  validarEmail,
  validarSenha,
  validarConfimacaoSenha
}
