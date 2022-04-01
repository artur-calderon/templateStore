import styled from 'styled-components'


  const urlPadrao = {
    defautlUrl:'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'
  }

 export const ImgPreview = styled.img`
  width: 7rem;
  height: 10rem;
  border: 1px solid black;
  border-radius: 0.2rem;
  background-image: url(${props=> props.src});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  `

