import React from 'react';
import mercadopago from 'mercadopago';


function MercadoPago(props) {
  let token = process.env.REACT_APP_ACCESS_TOKEN;
  mercadopago.configure({
    access_token: token
  })

  let preferences = {
    items: [props.items]
  }
  mercadopago.preferences.create(preferences)
    .then(function (response) {
      // Este valor substituirá a string "<%= global.id %>" no seu HTML
      global.id = response.body.id;
    }).catch(function (error) {
      console.log(error);
    });


  return (

    <div>teste</div>
  )
}

export default MercadoPago;