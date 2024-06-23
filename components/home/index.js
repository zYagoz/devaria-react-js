import { useAmp } from "next/amp";
import Login from "../login";
import comAutorizacao from "../../hoc/comAutorizacao";
import Feed from "../feed";


function Home({usarioLogado}) {
  
  return(
    <Feed usarioLogado={usarioLogado}/>
  )
}

export default comAutorizacao(Home);