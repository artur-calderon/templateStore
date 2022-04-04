import React from 'react'
import {
  useParams
} from "react-router-dom";
import InfoProduct from '../components/InfoProduct'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function InfoProductPage() {
  let { id } = useParams();
  return (
    <>
      <Header />
      <InfoProduct id={id} />
      <Footer />
    </>

  )
}