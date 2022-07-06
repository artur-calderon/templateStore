import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'




export default function Home() {
    document.title = 'Usemarcas | Home'
    return (
        <div>

            <Header />
            <Main />
            <Footer />

        </div>

    )
}