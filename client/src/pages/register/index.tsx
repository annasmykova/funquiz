import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AccountContext, RegisterAccountT } from '../../contexts/userContext'
import { validateEmail, validatePassword } from '../../helpers/validation'
import Page from '../../layout/page'

const initialFields: RegisterAccountT = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

type ErrorsT = {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

const SignUp = () => {
  const [errors, setErrors] = useState<ErrorsT>({})
  const [fields, setFields] = useState<RegisterAccountT>(initialFields)
  const {
    actions: { register },
  } = useContext(AccountContext)

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!fields.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(fields.email)) {
      newErrors.email = 'Please, input valid email'
    }
    if (!fields.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(fields.password)) {
      newErrors.password =
        'Password must contain upper letter, lower letter, digit and symbol'
    }
    if (!fields.firstName) {
      newErrors.firstName = 'First Name is required'
    }
    if (!fields.lastName) {
      newErrors.lastName = 'Last Name is required'
    }
    setErrors(newErrors)

    return Object.values(newErrors).reduce((acc, value) => acc && !value, true)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validate()) register(fields)
  }

  const handleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFields({
        ...fields,
        [key]: event.target.value,
      })
      setErrors({
        ...errors,
        [key]: undefined,
      })
    }

  return (
    <Page>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={fields.firstName}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  onChange={handleChange('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={fields.lastName}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  onChange={handleChange('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={fields.email}
                  error={!!errors.email}
                  helperText={errors.email}
                  onChange={handleChange('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={fields.password}
                  error={!!errors.password}
                  helperText={errors.password}
                  onChange={handleChange('password')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account?{' '}
                <NavLink className="primary-link" to="/login">
                  Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Page>
  )
}

export default SignUp
