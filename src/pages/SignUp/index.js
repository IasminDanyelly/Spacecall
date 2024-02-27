import { useContext, useState,} from 'react'
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';
import {toast} from 'react-toastify'

export default function SignUp(){
    const [name,setName]= useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
          

    const { SignUp, loadingAuth } = useContext(AuthContext)
   
     async function handleSubmit(e){
        e.preventDefault();

        if(email !== "" && password !== "" && name !== ""){
            await SignUp(email,password,name)
        }else{
            toast.warning("Preencha os campos!!")
        }
     }
   return(   




    <div className='container-center'>
    <section className='login'>
 
          <form className='formulario' onSubmit={handleSubmit}>
            <h1 className='titulo'>&lt;/&gt; SpaceCall</h1>

            <h2>Cadastrar</h2>

              <input
              type='text'
              placeholder='Digite seu nome'
              value={name}
              onChange={(e) => setName(e.target.value)}/>
              <input
              type='text'
              placeholder='Digite seu E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />

              <input 
              type='password'
              placeholder='*******'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />

              <button type='submit' className='botao'>
                {loadingAuth ? "Carregando..."  : "Cadastrar"}
              </button>
              <Link to='/' className='link'>Já possui uma conta? Faça o login</Link>
          </form>
        


    </section>
 </div>

   )
}