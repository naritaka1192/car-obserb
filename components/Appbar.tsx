import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export default function ButtonAppBar() {
  return (
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h4" component="div" color="yellow" sx={{ flexGrow: 1 }}>
            労使懇案件
          </Typography>
          <Button  variant="contained" color="inherit"><Link to="/">Homeへ</Link></Button>
          {/* <Button color="inherit"><Link to="/Signup">サインアップ</Link></Button> */}

        </Toolbar>
      </AppBar>
  );
}
