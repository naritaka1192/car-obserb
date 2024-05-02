import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged ,signInWithEmailAndPassword } from "firebase/auth";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Appbar4 from "./Appbar4";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


const Signin =()=>{
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")

  const handleEmail=(e: { target: { value: React.SetStateAction<string>; }; })=>{
    setEmail(e.target.value)    
  }

  const handlePassword=(e: { target: { value: React.SetStateAction<string>; }; })=>{
    setPassword(e.target.value)
  }

  const handleSignin=(e: { preventDefault: () => void; })=>{
    e.preventDefault()
    const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          alert("ログイン成功: " + userCredential.user.email);
          // ...
        })
        .catch((error) => {
          alert("エラー: " + error.code+ error.message);
        });
        }



return(
  <Grid container direction="column">
    <Grid item>
     <Appbar4 />
    </Grid>
    
    <Grid item container spacing={1}>
      <Grid item sm={1} />
    <Grid item>
     <p></p>
    <TextField type="email" placeholder="email入力ね" id="outlined-basic" label="e-mail入力" variant="outlined" onChange={handleEmail}/>
    </Grid>

    <Grid item>
    <p></p>
    <TextField type="password" placeholder="passwordを入力ね" id="outlined-basic" label="パスワード入力" variant="outlined" onChange={handlePassword}/>
    </Grid>

    <Grid item>
      <p></p>
    <Button variant="contained" size="large" onClick={handleSignin}>サインイン</Button>
    </Grid>    

    <Grid item>
      <p></p>    
    <Button variant="contained" size="large"><Link to="/">戻る</Link></Button>
    </Grid>    
    </Grid>
  </Grid>
)

}

export default Signin;