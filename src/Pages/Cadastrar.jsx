import React, { useEffect, useState } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  Button,
  TextField,
  Input,
  FormLabel,
  FormControl,
  Modal,
  Box
} from '@mui/material'
import { db } from '../firebase'
import { addDoc, collection, query, onSnapshot } from 'firebase/firestore'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import styles from './Cadastrar.module.css'

export default function Cadastrar() {
  const [newcategory, setNewCategory] = useState('')
  const [open, setOpen] = useState(false)
  const [allcategory, setAllCategory] = useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const Alert = withReactContent(Swal)

  useEffect(() => {
    const q = query(collection(db, 'categoria'))
    const category = onSnapshot(q, res => {
      setAllCategory(res)
    })
    return category
  }, [])

  const styleModal = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #afafaf',
    boxShadow: 24,
    p: 4
  }

  function AddNewCategory() {
    addDoc(collection(db, 'categoria'), {
      newcategory
    })
      .then(
        Alert.fire({
          title: 'Cadastrado com sucesso',
          icon: 'success'
        })
      )
      .catch(err =>
        Alert.fire({
          title: 'Não cadastrado',
          icon: 'error',
          text: `Hum.. Algo deu errado ${err}`
        })
      )
  }

  return (
    <div>
      <Header />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <TextField
            label="Nova categoria"
            size="small"
            variant="standard"
            fullWidth
            value={newcategory}
            onChange={e => setNewCategory(e.target.value)}
          />
          <Button onClick={AddNewCategory}>Salvar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </Box>
      </Modal>

      {/* *********************  FORM ************ */}
      <div className={styles.formCad}>
        <FormLabel>Adicione seus produtos</FormLabel>
        <FormControl className={styles.form}>
          <div className={styles.containerInfo}>
            <div className={styles.nameCat}>
              <TextField
                label="Título"
                size="small"
                variant="standard"
                helperText="Camisa M Gola V"
                fullWidth
              />

              <select style={{ height: '1.5rem' }}>
                <option value="selected">Categoria</option>
                {allcategory.docs.map(cat => {
                  return <option key={cat.id}>{cat.data().newcategory}</option>
                })}
              </select>
              <Button
                variant="contained"
                component="span"
                style={{ height: '3rem' }}
                onClick={handleOpen}
              >
                Nova Categoria
              </Button>
            </div>
            <TextField
              fullWidth
              label="Descrição"
              size="small"
              variant="outlined"
              helperText="Tecido de algodão etc..."
            />
            <div className={styles.saveArea}>
              <TextField
                label="Preço"
                size="small"
                variant="standard"
                style={{ width: '8rem' }}
                type="number"
              />
              <Button variant="contained" component="span">
                Salvar
              </Button>
            </div>
          </div>
          <div className={styles.upload}>
            <FormLabel>Insira uma foto</FormLabel>
            <div className={styles.previewPhoto}></div>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: 'none' }}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </div>
        </FormControl>
      </div>
      <Footer />
    </div>
  )
}
