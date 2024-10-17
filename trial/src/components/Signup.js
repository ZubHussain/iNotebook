import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {

  const [credentials, setCredentials] = useState({ name:"",email: "", password: "",cpassword:"" });
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://i-notebook-backend-one.vercel.app/auth/createuser', {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('authToken', json.authToken);
      // window.location.href = '/inotes'
      navigate('/inotes')
    }
    else{
      alert("Invalid username or password")
    }
  };

  const onchange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }


  return (
   
    <div className="main">
    <p className="sign" align="center">
      Signup
    </p>
    <form className="form1" onSubmit={handleSubmit}>
    <input
        className="un "
        type="text"
        align="center"
        placeholder="Name"
        id="name"
        name="name"
        onChange={onchange}
      />
      <input
        className="un "
        type="email"
        align="center"
        placeholder="Email"
        id="email"
        name="email"
        onChange={onchange}
      />
      <input
        className="pass"
        type="password"
        align="center"
        placeholder="Password"
        id="password"
        name="password"
        onChange={onchange}
      />
      {/* <input
        className="un "
        type="password"
        align="center"
        placeholder="Confirm Password"
        id="cpassword"
        name="cpassword"
       
        onChange={onchange}
      /> */}
       <button type="submit" className="btn btn-dark  submit">
       Submit
     </button>
      <p className="forgot" align="center"><Link to="#"/>Forgot Password?</p>
          
    </form>
  </div>
  );
}
