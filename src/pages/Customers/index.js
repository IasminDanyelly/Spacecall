import {useState} from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {db} from '../../services/firebaseConnection'
import {addDoc,collection} from 'firebase/firestore'
import {FiUser} from 'react-icons/fi'
import { toast } from 'react-toastify'

export default function Customers(){
    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')

    function formatCnpj(value){
      return value
      .replace(/\D/g, '') // remove caracteres não númericos
      .replace(/^(\d{2})(\d)/, '$1.$2') //Coloca ponto após os primeiros 2 digitos
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')  // Coloca ponto após os próximos 3 dígitos
      .replace(/\.(\d{3})(\d)/, '.$1/$2') // Coloca barra após os próximos 3 digitos
      .replace(/(\d{4})(\d)/, '$1-$2') // Coloca o hífen após os últimos 4 digitos
    }


    async function handleRegister(e){
        e.preventDefault();
         
        if(nome !== '' && cnpj !== '' && endereco !== ''){
            await addDoc(collection(db, "customers"),
              {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
              })
              .then(() => {
                setNome('')
                setCnpj('')
                setEndereco('')
                toast.success('Cadastrado com sucesso')
              })
              .catch((error) => {
                console.log(error)
                toast.error("Ops, algo deu errado!")
              })
        }else{
            toast.warning('Preencha todos os campos!')
        }
    }

    function handleCnpjChange(e){
      const formatedCnpj = formatCnpj(e.target.value)
      setCnpj(formatedCnpj)
    }
    return(
        <div>
            <Header/>
            
            <div className='content'>
               <Title name='Clientes'>
                 <FiUser size={25} color='#fff'/>
               </Title>
               
               <div className='container'>
               <form className='form-profile' onSubmit={handleRegister}> 
                <label>Nome Fantasia</label>
                  <input 
                  className='input-cliente'
                  type='text'
                  placeholder='Nome da empresa'
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <label>CNPJ</label>
                  <input 
                  className='input-cliente'
                  type='text' 
                  placeholder='Digite o CNPJ'
                  maxLength='18'
                  value={cnpj}
                  onChange={handleCnpjChange}
                />

                <label>Endereço</label>
                  <input 
                  className='input-cliente'
                  type='text'
                  placeholder='Endereço da empresa'
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />

                  <button type='submit'>Salvar</button>
               </form>
               </div>
            </div>
        </div>
    )
}