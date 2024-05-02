import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
  return (
      <AppBar position="static" color="success">
        <Toolbar>
          <Typography variant="h4" component="div"  sx={{ flexGrow: 1 }}>
            内容
          </Typography>
        </Toolbar>
      </AppBar>
  );
}