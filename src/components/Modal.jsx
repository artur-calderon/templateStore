import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase';
import './Modal.css'


function Modal(props) {

  const [clientes, setClientes] = useState(null)
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState([])
  const [enderecoSend, setEnderecoSend] = useState('')

  useEffect(() => {
    const q = query(
      collection(db, 'clientes'),
      where('uid', '==', props.user.uid)
    )
    return onSnapshot(q, client => {

      setClientes(client.docs)
    })

  }, [props.user.uid])

  function updateUser(e, id) {
    e.preventDefault()
    const userRef = doc(db, 'clientes', id);
    updateDoc(userRef, {
      cpf,
      endereco,
      telefone
    }).then(() => {
      alert('certo')
    }).catch(err => alert(err))
  }

  function pay() {
    props.pagar()
    props.cadastraPedido(enderecoSend)
  }

  return (
    <div className='modalBG'>
      <div className='modalContainer'>
        <div className='closeButton' onClick={() => props.closer(false)}>X</div>
        {
          clientes &&
          clientes.map(cli => {
            console.log(cli.data())
            if (cli.data().cpf == '' || cli.data().endereco == [] || cli.data().telefone == '') {
              return (
                <div className="form-style-8">
                  <h2>Alguns dados estão faltando</h2>
                  <form onSubmit={(e) => updateUser(e, cli.id)}>
                    <input type="number" name="cpf" onChange={(e) => setCpf(e.target.value)} required placeholder="CPF" />
                    <input type="number" name="telefone" onChange={(e) => setTelefone(e.target.value)} required placeholder="Telefone" />
                    <input type="text" name="endereco" onChange={(e) => setEndereco(Array(e.target.value))} required placeholder="Endereço" />
                    <input type="submit" value="Salvar" />
                  </form>
                </div>
              )
            } else {
              return (
                <div className='form-style-8'>
                  <h2>Qual endereço de entrega?</h2>
                  <select className='minimal' onChange={e => setEnderecoSend(e.target.value)} value={enderecoSend}>
                    {
                      cli.data().endereco.map((end, index) => (<option value={end} key={index}>{end}</option>))
                    }
                  </select>
                  <input type="submit" value="Adicionar endereço" />
                  <input type="submit" onClick={props.type == 'compra' ? () => pay() : () => props.condicional(enderecoSend == '' ? cli.data().endereco[0] : enderecoSend)} value={props.type == 'compra' ? 'Comprar' : 'Pedir condicional'} />
                </div>
              )
            }
          })}
      </div>
    </div >
  );
}

export default Modal;