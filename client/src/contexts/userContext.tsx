import {AxiosError} from "axios";
import {useEffect, useState} from "react";
import * as React from 'react'
import {useHistory} from "react-router-dom";
import api from "../config/axiosInterceptor";

type UserT = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
}

export type LoginAccountT = {
  email: string,
  password: string
}

export type RegisterAccountT = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}

type AccountContextT = {
  state: {
    user: UserT | null,
    loading: boolean,
    error?: any
  },
  actions: {
    login: (acc: LoginAccountT) => void,
    register: (acc: RegisterAccountT) => void,
    logout: () => void,
  }
}

const initialState: AccountContextT = {
  state: {
    user: null,
    loading: true,
  },
  actions: {
    login: () => {},
    register: () => {},
    logout: () => {},
  }
}

export const AccountContext = React.createContext<AccountContextT>(initialState)


const UserProvider = ({ children }: { children: React.ReactNode }): any => {
  const [user, setUser] = useState(initialState.state.user)
  const [loading, setLoading] = useState(initialState.state.loading)
  const [error, setError] = useState(initialState.state.error)
  const history = useHistory()


  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      fetchAccount()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchAccount = async() => {
    try {
      const response = await api.get('/user');
      setUser(response.data.user);
      setLoading(false)
    } catch (error) {
      setError(error as AxiosError);
    }
  }

  const register = async (data: RegisterAccountT) => {
    try {
      const response = await api.post('/user/register', {
        ...data,
      });
      setUser(response.data.user);
      localStorage.setItem('authToken', response.data.token)
    } catch (error) {
      setError(error as AxiosError);
    }
    setLoading(false);
  }

  const login = async (data: LoginAccountT) => {
    try {
      const response = await api.post('/user/login', {
        ...data,
      });
      setUser(response.data.user);
      localStorage.setItem('authToken', response.data.token)
    } catch (error) {
      setError(error as AxiosError);
    }
    setLoading(false);
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authToken')
    history.push('/login')
  }

  const state = {
    user,
    loading,
    error
  }

  const actions = {
    login,
    logout,
    register,
  }

  return (
    <AccountContext.Provider value={{state, actions }}>
      {children}
    </AccountContext.Provider>
  )
}

export default UserProvider
