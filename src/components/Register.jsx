import React, {useState} from "react";
import axios from 'axios';
const url = 'http://localhost:3002/user';

export const Register = (props) => {
    const [newName, setName] = useState('');
    const [newEmail, setEmail] = useState('');
    const [newPass, setPass] = useState('');


    
    const handleSubmit = async (e) => {
        e.preventDefault();  
        const user = {
                      name:newName, 
                      email:newEmail,
                      password:newPass
                    }
      let headers = {'Content-type': 'application/json; charset=UTF-8'};

      let data = JSON.stringify(user);

        const response = fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials': true
          },
          mode:"cors",
          body: data,
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.error)
            }
           return response.json()
        }).then((data) => {
          console.log(data);
          console.log("inserted")
        }).catch((err) => {
          console.log(err);
        })
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input value={newName} onChange={(e) => setName(e.target.value)} name ="name" id="name" placeholder="full name"/>
                <label value>email</label>
                <input value={newEmail} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your email" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value ={newPass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button>Register</button>
            </form>
        <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login here</button>
    </>
    )
}