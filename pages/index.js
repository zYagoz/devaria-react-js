import { useState } from "react"
import Pessoa from "../components/pessoa"
import comAutorizacao from "../hoc/comAutorizacao"

function Home(){
  const [idadeDouglas, setIdadeDouglas] = useState(17)
  const pessoas = [
    {
      nomePessoa : 'Cleiton',
      idadePessoa: 28
    },
    {
      nomePessoa : 'Hadrian',
      idadePessoa : 19
    },
    {
      nomePessoa : 'Paulo',
      idadePessoa : 50
    },
  ]

  const incrementarIdadeDouglas = () =>{
    setIdadeDouglas(++idadeDouglas);
  }
  
  
  
  return (
    <>
      <h1>Texto h1! {process.env.NEXT_PUBLIC_TESTE}</h1>
      <Pessoa nome='Yago' idade={idadeDouglas}/>
      <Pessoa nome='Ruivas' idade={1111}/>

      {pessoas.map(({nomePessoa, idadePessoa}, index) =>  {
        return <Pessoa 
        nome ={nomePessoa} 
        idade = {idadePessoa}
        key={index}
        />
      } )}

      <button onClick={incrementarIdadeDouglas}>Aumenta idade</button>
    </>
  )
};

export default comAutorizacao(Home);