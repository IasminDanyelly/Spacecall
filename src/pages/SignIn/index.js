import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import './signin.css';
import Logo from '../../assets/logo.png';
import {AuthContext} from '../../contexts/auth';
import {toast} from 'react-toastify';

export default function SignIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { SignIn,loadingAuth, } = useContext(AuthContext);


    async function handleSignIn(e){
       e.preventDefault();

       if(email !== "" && password !== ""){
          await SignIn(email,password)
       }else{
        toast.warning("Preencha os campos!!")
       }
    }

   return(
   
   <div className='container-center'>
      <section className='login'>
   
            <form className='formulario' onSubmit={handleSignIn}>
              <h1 className='titulo'>&lt;/&gt; SpaceCall</h1>

              <h2>Entrar</h2>
                <input
                type='text'
                placeholder='Digite seu email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                type='password'
                placeholder='*******'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button type='submit' className='botao'>{loadingAuth ? "Carregando..." : "Acessar"}</button>
                <Link to='/register' className='link'>Crie uma conta</Link>
            </form>
          


      </section>
   </div>

 )
}