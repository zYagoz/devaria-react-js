import Avatar from '../avatar';


export default function ResultadoPesquisa({nome, email, avatar, onClick, id}){
  return(
    <div className="resultadoPesquisa" onClick={() => onClick(id)}>
      <Avatar/>
      <div className='informacoesUsuario'>
        <strong>{nome}</strong>
        <span>{email}</span>
      </div>

    </div>
  )
}