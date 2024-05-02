import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export default function ButtonAppBar() {

  const handleClick=()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
      alert("成功")
    }).catch((error: any) => {
      alert("失敗")
    });
  }
  return (
      <AppBar position="static" color="success">
        <Toolbar>
          <Typography variant="h4" component="div"  sx={{ flexGrow: 1 }}>
            HOME
          </Typography>
        </Toolbar>
      </AppBar>
  );
}