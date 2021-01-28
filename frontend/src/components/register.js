import React, {useState} from 'react'; 
import firebase from 'firebase'
import axios from 'axios'
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
const Register = (props) => {
  //States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); 
    
  
  const onSubmit = (e) => {
    e.preventDefault();
    let tokenId;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async () => {
        await firebase.auth().currentUser.getIdToken(true)
          .then((result) => {
            tokenId = result;
          })
      })
      .then(() => {
        axios.post('http://localhost:5000/register', {
          tokenId,
          firstName,
          lastName
        })
        .then((res) => {
          console.log(res);
          
        })
      })
      .catch((error) => {
        console.log(error)
      })
   
    history.push('/Home');
  
    }
  
  return (
    <div className="Register">
      
      <Form> 
        <FormGroup>
          <Row>
            <Input onChange={(value) => setFirstName(value.target.value)}
              type="text"
              name="firstName"
              placeholder="First Name" />
          </Row>
          <Row>
            <Input onChange={(value) => setLastName(value.target.value)}
              type="text"
              name="lastName"
              placeholder="Last Name" />
          </Row>
          <Row>
            <Input onChange={(value) => setEmail(value.target.value)}
              type="Email"
              name="email"
              placeholder="Email" />
          </Row>
          <Row> 
            <Input onChange={(value) => setPassword(value.target.value)}
              type="password"
              name="Password"
              placeholder="Password" />
          </Row>
          <Row>
            <Button onClick={onSubmit} color="secondary" size="lg">Register</Button>
      </Row>
      </FormGroup>
    </Form>
     
        
    </div>
     
    
      
    
     
  
    );
}

export default Register;