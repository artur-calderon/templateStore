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
  const [promotionalCode, setPromotionalCode] = useState('')
  const [promotionalCodeDiscount, setPromotionalCodeDiscount] = useState(0)

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
  function promotionCode(e) {
    e.preventDefault()
    let inputCodes = e.target.value.toUpperCase()
    if (inputCodes) {
      let promotionalCodes = query(doc(db, 'codigoPromocional', inputCodes))

      onSnapshot(promotionalCodes, res => {
        let valueToDiscount = res.data()[inputCodes]
        let namePromotionalCode = ''

        for (const key in res.data()) {
          setPromotionalCode(key)
          namePromotionalCode = key
        }


        if (namePromotionalCode != promotionalCode) {
          props.settotal(prev => {
            let valor = prev
            let desconto = valor * valueToDiscount / 100
            setPromotionalCodeDiscount(desconto)
            return valor - desconto
          })
        } else {
          return
        }
      })
    }
  }

  function handleCloseModal() {
    props.closer(false)
    removePromotionalCode()
  }

  function removePromotionalCode() {
    setPromotionalCode('')
    props.settotal(prev => prev + promotionalCodeDiscount)
    setPromotionalCodeDiscount(0)
  }

  function formatPrice(price) {
    return Number(price).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })

  }

  return (
    <div className='modalBG'>
      <div className='modalContainer'>
        <div className='closeButton' onClick={handleCloseModal}>X</div>
        {
          clientes &&
          clientes.map(cli => {

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
                  {
                    props.type == 'compra' && (
                      <form onChange={(e) => promotionCode(e)} onSubmit={promotionCode}>
                        <p>Código Promocional</p>
                        <input id="code" className='' placeholder="Digite seu código..." disabled={promotionalCode && true} />
                        {promotionalCode ? (
                          <span className='cupomDesconto'>Cupom: {promotionalCode} <span onClick={removePromotionalCode}>&#10005;</span>
                          </span>

                        ) : ''}
                        <span>Total: {formatPrice(props.total)}</span>
                      </form>
                    )
                  }
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