import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  collection,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,

} from "firebase/firestore";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./dashboard.css";
import Title from "../../components/Title";
import Modal from '../../pages/Modal'; 

import { format } from "date-fns";

const listRef = collection(db, "chamados");
export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();
  const [loadingMore, setLoadingMore] = useState(false);
  const [postModal, setPostModal] = useState(false)
  const [detail, setDetail] = useState()

  useEffect(() => {
    async function loadChamados() {
     
      const q = query(listRef, orderBy("created", "desc"), limit(2), );

      const querySnapshot = await getDocs(q);
      setChamados([]);

      await updateState(querySnapshot);
      setLoading(false);
    }

    loadChamados();

    return () => {};
  }, []);

  async function updateState(querySnapshot) {
    const isCollectionEmpty = querySnapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          complemento: doc.data().complemento,
          assunto: doc.data().assunto,
          status: doc.data().status,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), "dd/MM/yyyy"),
        
        });
      });

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

      setLastDocs(lastDoc);
      setChamados((chamados) => [...chamados, ...lista]);
      
    } else {
      setIsEmpty(true);
    }

    setLoadingMore(false);
  }

  async function handleMore() {
    setLoadingMore(true);

    const q = query(
      listRef,
      orderBy("created", "desc"),
      startAfter(lastDocs),
      limit(1),
    
      
    );
    const querySnapshot = await getDocs(q);
    await updateState(querySnapshot);
  }

  function toggleModal(item){
    setPostModal(!postModal)
    setDetail(item)
  }

  if(loading) {
    return (
      <div>
        <Header />

        <div className="content">
          <Title name="Atendimentos">
            <FiMessageSquare color="#fff" size={25} />
          </Title>

          <div className="container dashboard">
            <span>Buscando chamados...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Atendimentos">
          <FiMessageSquare color="#fff" size={25} />
        </Title>

        <>
          {chamados.length === 0 ? (
            <div className="container dashboard">
              <span>Nenhum chamado encontrado...</span>
              <Link to="/new" className="new">
                <FiPlus color="#fff" size={25} />
                Novo chamado
              </Link>
            </div>
          ) : (
            <>
              <Link to="/new" className="new">
                <FiPlus color="#fff" size={25} />
                Novo chamado
              </Link>

              <table>
                <thead>
                  <tr>
                    <th scope="col">Clientes</th>
                    <th scope="col">Assuntos</th>
                    <th scope="col">Status</th>
                    <th scope="col">Cadastrado em</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>

                <tbody>
                  {chamados.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Clientes">{item.cliente}</td>
                        <td data-label="Assuntos">{item.assunto}</td>
                        <td data-label="Status">
                          <span
                            className="badge"
                            style={{
                              backgroundColor:
                                item.status === "Aberto" ? "#6d9663" : "#999",
                              color: "#ececec",
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td data-label="Cadastrado">{item.createdFormat}</td>
                        <td data-label="#">
                          <button
                            onClick={() => toggleModal(item)}
                            className="action"
                            style={{ backgroundColor: "#5b92a3" }}
                          >
                            <FiSearch color="#fff" size={17} />
                          </button>
                          <Link
                            to={`/new/${item.id}`}
                            className="action"
                            style={{ backgroundColor: "#e0a562" }}
                          >
                            <FiEdit2 color="#FFF" size={17} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {loadingMore && <h3 className="text-more">Buscando mais chamados...</h3>}
              {!loadingMore && !isEmpty && 
                <button className="btn-more" onClick={handleMore}>
                  Buscar mais
                </button>
              }
            </>
          )}
        </>
      </div>

      {postModal && (
        <Modal
         conteudo={detail}
         close={() => setPostModal(!postModal)}
        /> 
      )}
    </div>
  );
}
