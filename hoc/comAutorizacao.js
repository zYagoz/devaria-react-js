import { useRouter } from "next/router";

export default function comAutorizacao(Componente) {
  const estaLogado = true;
  
  return (props) => {
    if(typeof window === 'undefined'){
      return null;
    }
    
    const router = useRouter();
    if(estaLogado){
      return <Componente {...props} />
    }

    router.push('/login');
  }
  
}