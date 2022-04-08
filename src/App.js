import logo from './logo.svg';
import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase.init';
import { Form } from 'react-bootstrap';
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [register , setRegister] = useState(false)
  const [error , setError] = useState(false)
  const [validated, setValidated] = useState(false);
  const [email , setEmail] = useState('')
  const [passward , setPassward] = useState('')

  const handelEmailBlur = e =>{
    setEmail(e.target.value);
  }
  const handelPasswardBlur = e =>{
    setPassward(e.target.value);
  }



  const handelFromSubmit = event =>{
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return
    }

    if(!/(?=^.{6,}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/.test(passward)){
      setError('Please Password shoud be one creator')
      return
    }
    setValidated(true);
    setError('')

    if(register){
      signInWithEmailAndPassword(auth , email , passward)
      .then(result=>{
        console.log(result.user);
      })
      .catch(error =>{
        console.log(error);
      })
    }

    else{
      createUserWithEmailAndPassword(auth , email, passward)
    .then(result =>{
      setEmail('')
      setPassward('')
      verifyEmail()
   
    })
    .catch(error=>{
      console.log(error)
    })
    }
    event.preventDefault()
  }

  const hundaleRegister = e =>{
    setRegister(e.target.checked);
  }

const verifyEmail = () =>{
  sendEmailVerification(auth.currentUser)
  .then(()=>{
    console.log('email verification massage sent');
  })
}

    const restPasswoard = () =>{
      sendPasswordResetEmail(auth, email)
      .then(result =>{
        console.log(result);

      })
      .catch(error =>{
        console.log(error);
      })
    }

  return (
    <div className="">


      <div className="from w-50 mx-auto p-3 border shadow mt-4 rounded">
        <h4>Please {register ? 'LogIn' : 'Register!'} </h4>
        

      <Form noValidate validated={validated} onSubmit={handelFromSubmit}>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control onBlur={handelEmailBlur} type="email" placeholder="Enter email" required />
    <Form.Control.Feedback type="invalid">
            Please provide a email.
          </Form.Control.Feedback>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onBlur={handelPasswardBlur} type="password" placeholder="Password" required />
    <Form.Control.Feedback type="invalid">
            Please provide a Password.
          </Form.Control.Feedback>
        
  </Form.Group>
  <p className='text-danger'>{error}</p>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check onChange={hundaleRegister} type="checkbox" label="Allready Registor?" />
  </Form.Group>
  <p onClick={restPasswoard} className='text-primary'>Forgate Password?</p>
  <input className='btn btn-primary' type="submit" value={register ? 'LogIn' : 'Register'} />
</Form>
      </div>
   
    </div>
  );
}

export default App;
