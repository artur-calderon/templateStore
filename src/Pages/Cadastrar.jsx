import React, { useEffect, useState } from 'react'


import {
  Button,
  TextField,
  Input,
  FormLabel,
  FormControl,
  Modal,
  Box
} from '@mui/material'
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';



import { db, app, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, query, onSnapshot } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import styles from './Cadastrar.module.css'
import { ImgPreview } from './imageStyle'



export default function Cadastrar() {
  const [newcategory, setNewCategory] = useState('')
  const [open, setOpen] = useState(false)
  const [allcategory, setAllCategory] = useState({})
  const history = useNavigate()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const Alert = withReactContent(Swal)

  // Pega os dados do formulario
  const [title, setTitle] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [categoria, setCategoria] = useState('')
  const [image, setImage] = useState()
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false)



  useEffect(() => {
    const q = query(collection(db, 'categoria'))
    const category = onSnapshot(q, res => {
      setAllCategory(res.docs)
    })
    return category
  }, [])

  useEffect(() => {
    const auth = getAuth(app)
    const logado = onAuthStateChanged(auth, user => {
      if (!user) {
        history('/')
      }
    })
    return logado
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
    zIndex: '1',
    p: 4
  }


  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };

  // Função Para adicionar nova categoria
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


  // Função Salva os produtos no firebase
  function SaveProduct() {
    if (categoria === 'selected' || title === '' || descricao === ' ' || preco === '') {
      Alert.fire({
        title: 'Adicione informações para poder salvar',
        icon: 'info'
      })
      return
    }
    setShowProgressBar(true)
    const storageRef = ref(storage, image.name)
    uploadBytesResumable(storageRef, image).then(res => {
      console.log(res)
      let progresso = (res.bytesTransferred / res.totalBytes) * 100
      setProgress(prevProgress => prevProgress = 0 ? prevProgress : progresso)

      getDownloadURL(ref(storageRef)).then(url => {
        addDoc(collection(db, 'products'), {
          title,
          descricao,
          categoria,
          url,
          imageRef: image.name,
          preco
        }).then(() => {
          setShowProgressBar(false)
          Alert.fire({
            title: 'Cadastrado com sucesso',
            icon: 'success'
          })
        }).catch((error) => {
          Alert.fire({
            title: 'Não cadastrado',
            icon: 'error',
            text: `Hum.. Algo deu errado ${error}`
          })
        })

      })
    })


    console.log(title)
    setTitle('')
    console.log(descricao)
    setDescricao('')
    console.log(preco)
    setPreco('')
    console.log(categoria)


  }
  // Componente para cadastro de produtos
  function FormCadastro() {
    return (
      <>
        {/* *********************  FORM ************ */}
        < div className={styles.formCad} >
          <FormLabel>Adicione seus produtos</FormLabel>
          <FormControl className={styles.form}>
            <div className={styles.containerInfo}>
              <div className={styles.nameCat}>
                <TextField
                  label="Título"
                  size="small"
                  variant="standard"
                  helperText="Camisa M Gola V"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  fullWidth
                />

                <select
                  style={{ height: '1.5rem' }}
                  onChange={e => setCategoria(e.target.value)}
                >
                  <option value="selected">Categoria</option>
                  {allcategory.length > 0 ? (
                    allcategory.map(cat => {
                      return (
                        <option key={cat.id} value={cat.data().newcategory}>
                          {cat.data().newcategory}
                        </option>
                      )
                    })
                  ) : (
                    <option>Carregando...</option>
                  )}
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
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                variant="outlined"
                helperText="Tecido de algodão etc..."
              />
              <div className={styles.saveArea}>
                <TextField
                  label="Preço"
                  size="small"
                  value={preco}
                  onChange={e => setPreco(e.target.value)}
                  variant="standard"
                  style={{ width: '8rem' }}
                  type="number"
                />
                <Button
                  variant="contained"
                  component="span"
                  onClick={SaveProduct}
                >
                  Salvar
                </Button>
              </div>
            </div>

            {/* ########### Sessão de upload de imagem ################## */}
            <div className={styles.upload}>
              <FormLabel>Insira uma foto</FormLabel>
              <ImgPreview src={image ? URL.createObjectURL(image) : 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'} />
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={e => setImage(e.target.files[0])}
                  style={{ display: 'none' }}
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </div>
          </FormControl>
          {
            showProgressBar ? <Box sx={{ width: '100%' }} >
              <LinearProgressWithLabel value={progress} />
            </Box> : null
          }

        </div >
      </>
    )
  }

  return (
    <div>
      <div>
        <h1>Administração</h1>
      </div>
      {/* Modal para Criar uma nova categoria e adicionar no Banco de dados */}
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
      <FormCadastro />



    </div>
  )
}
