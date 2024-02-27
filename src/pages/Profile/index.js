import Header from '../../components/Header'
import Title from '../../components/Title'
import { useContext, useState } from 'react'
import avatar from '../../assets/avatar.png'
import { FiDownload, FiSettings } from 'react-icons/fi'
import { FiUpload } from 'react-icons/fi'
import { AuthContext } from '../../contexts/auth'
import {doc, updateDoc} from 'firebase/firestore';
import {db, storage} from '../../services/firebaseConnection'
import {ref, uploadBytes, getDownloadURL, uploadString} from 'firebase/storage'

import './profile.css'
import { toast } from 'react-toastify'

export default function Profile(){

    const {user, storageUser, setUser, logout} = useContext(AuthContext);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [avatarImage, setAvatarImage] = useState(null)

    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)




      function handleFile(e){
        if(e.target.files[0]){
          let image = e.target.files[0]

          if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setAvatarImage(image)
            setAvatarUrl(URL.createObjectURL(image))
          }else{
            toast.warning("Envie imagens do tipo PNG ou JPEG!")
            setAvatarImage(null)
            return;
          }
        }
      }


      async function handleUpload(){
         const currentUid = user.uid;

         const uploadRef = ref(storage,`images/${currentUid}/${avatarImage.name}`)

         const uploadTask = uploadBytes(uploadRef, avatarImage)
         .then((snapshot) => {
              getDownloadURL(snapshot.ref).then(  async (downloadUrl) => {
                 let urlFoto = downloadUrl;

                 const docRef = doc(db, "users", user.uid)
                 await updateDoc(docRef, {
                  avatarUrl: urlFoto,
                  nome: nome
                 }).then(() => {
                  let data = {
                    ...user,
                    nome:nome,
                    avatarUrl: urlFoto
                  }
  
                  setUser(data)
                  storageUser(data)
                  toast.success("Salvo com sucesso")
                })
              })
              
         })
      }
      async function handleSubmit(e){
        e.preventDefault();

        if(avatarImage === null && nome !== ''){
           let docRef = doc(db, 'users', user.uid);
           await updateDoc(docRef,{
              nome: nome

           })
           .then(() => {
             let data = {
              ...user,
              nome:nome
             }

             setUser(data);
             storageUser(data);
             toast.success("Atualizado com sucesso")
           })
        }else if(nome !== '' && avatar !== null){
            handleUpload();
        }
      }
     return(
        <div>
            <Header/>

            <div className='content'>
               <Title name="Minha Conta">
                <FiSettings size={25} color='#fff'/>
               </Title>
           
            <div className='container'>
                
                <form className='form-profile' onSubmit={handleSubmit}>
                    <label className='label-avatar'>
                        <span>
                          <FiUpload color='#fff' size={25}/>            
                        </span>
                        <input type='file' accept='image/*' onChange={handleFile}/>

                        {avatarUrl == null ? (
                            <img src={avatar} alt='Foto de perfil' width={200} height={200}/>

                        ) : 
                           <img src={avatarUrl} alt="Foto de Perfil" width={200} height={200}/>
                         }
                    </label>

                    <label>Nome</label>
                    <input type='text' value={nome} onChange={(e) => setNome(e.target.value)}/>

                    <label>Email</label>
                    <input type='email' disabled={true} value={email}/>

                    <button type='submit' >Salvar</button>
                </form>

            </div>
              
              <div className='container'>
                <button className='logout-btn' onClick={() => logout()}>Sair da conta</button>
              </div>
            </div>
        </div>
    )
}