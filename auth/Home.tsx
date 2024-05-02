import REACT, { useState,useEffect } from "react"
import {BrowserRouter,Routes,useSearchParams,Route,Link,useNavigate} from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import '../App.css';
import Button from '@mui/material/Button';
import { User, signOut ,getAuth,onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseui";
import Appbar3 from "./Appbar3";
import Grid from '@mui/material/Grid';


const Home=()=>{

  const [user,setUser] = useState<User | null>(null)

  const handleClick=()=>{

    const auth = getAuth();
    signOut(auth).then(() => {
      alert("成功")
    }).catch((error: any) => {
      alert("失敗")
    });
  }

const authInstance=getAuth();
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(authInstance,(user)=>{
        setUser(user)
    });
    return () =>unsubscribe();
},[])

  return(
    <Grid container direction="column">
        <Grid item >
        <Appbar3 />
        </Grid>
    <Grid item container spacing={1}>
      <Grid item sm={1} />
      <Grid item>
      <p></p>
        {user ?  <Button color="warning"><Link to ="/App">todoリストへ</Link></Button>:"★ログアウト中です"}
      </Grid>

      {/* <Grid item>
      <p></p>
      <Button variant="contained" color="warning"><Link to ="/Signup">登録</Link></Button>
      </Grid> */}

      <Grid item>
      <p></p>
      { user ? " ":<Button variant="contained" color="info"><Link to ="/Signin">サインイン画面へ</Link></Button>}
      </Grid>
      <Grid item>
      <p></p>
      {user ? <Button variant="contained" color="primary" onClick={handleClick}>ログアウト</Button> :""}
      </Grid>

      </Grid>
    </Grid>
  )
}


export default Home