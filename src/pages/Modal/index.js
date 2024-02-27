import './modal.css'
import {FiX} from 'react-icons/fi'

export default function Modal({conteudo, close}){
    return(
        <div className='modal'>
          <div className='container'>
            <button className='close' onClick={close}>
               <FiX size={25} color='#FFF'/>
               Voltar
            </button>   
            
            <main>
                <h2>Mais detalhes</h2>

                <div className='row'>
                   <span>
                    Cliente: <i>{conteudo.cliente}</i>
                   </span>
                   <span>
                    Cadastrado em <i>{conteudo.createdFormat}</i>
                   </span>
                </div>

                <div className='row'>
                    <span>
                        Status: <i className='status-badge' style={{color:"#fff", backgroundColor: conteudo.status === 'Aberto' ? '#6d9663' :  "#999" }}>{conteudo.status}</i>
                    </span> 
                    
                </div>

                {conteudo.complemento !== '' && (
                    <>
                     <h2>Complemento</h2>
                     <p>
                        {conteudo.complemento}
                     </p>
                    </>
                )}
            </main>
          </div> 
        </div>
    )
}