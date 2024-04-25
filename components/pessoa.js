export default function Pessoa({nome, idade}){
  return(
    <div className="pessoa">
      <b>Nome</b>: {nome}
      <br/>
      <b>Idade</b>: {idade}
      <br/>

      {idade >= 18 ? (
        <>
          <span>Maior de idade</span>
        </>
      ):(
        <span>Menor de idade</span>

      )
      
      }


      <br/>
      <br/>
    </div>
  );
}