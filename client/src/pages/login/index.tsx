import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import {AccountContext, LoginAccountT} from "../../contexts/userContext";
import Page from '../../layout/page';

const initialFields: LoginAccountT = {
  email: '',
  password: ''
}

const Login = () => {
  const { actions: { login } } = useContext(AccountContext)
  const [fields, setFields] = useState<LoginAccountT>(initialFields)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(fields)
  };

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [key]: event.target.value
    })
  }

  return (
    <Page>
      <Container maxWidth="xs">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={fields.email}
              onChange={handleChange('email')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={fields.password}
              onChange={handleChange('password')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Sign In
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                Don't have an account?{' '}
                <NavLink className="primary-link" to="/signup">
                  Sign up
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}

export default Login
