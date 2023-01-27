import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [paymentId, setPaymentId] = useState(null);
  const [cardInput, setCardInput] = useState(null);

  const submitPayment = () => {
    window.monei.createToken(cardInput)
      .then(function (result) {
        console.log(result);
        if (result.error) {
          // Inform the user if there was an error.
        } else {
          // Send the token to MONEI.
          moneiTokenHandler(result.token);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Confirm the payment
  const moneiTokenHandler = (token) => {
    return window.monei
      .confirmPayment({ paymentId: paymentId, paymentToken: token })
      .then(function (result) {
        // At this moment you can show a customer the payment result
        // But you should always rely on the result passed to the callback endpoint on your server
        // to update the order status
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  useEffect(() => {
    axios.get(`http://localhost:3001/create-payment`).then(res => {
      var paymentId = res.data.id;
      setPaymentId(paymentId);
      var cardInput = window.monei.CardInput({
        paymentId: paymentId,
        accountId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      });
      cardInput.render('#container');
      setCardInput(cardInput);
    })
  }, [])

  return (
    <div className="App">
      <div id="container">
      </div>
      <button onClick={submitPayment}>Payer 1€10</button>
    </div>
  );
}

export default App;
