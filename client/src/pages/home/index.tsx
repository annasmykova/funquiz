import { Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AccountContext } from '../../contexts/userContext'
import Page from '../../layout/page'
import Wrapper from '../../layout/wrapper'

const Home = () => {
  const {
    state: { user },
  } = useContext(AccountContext)
  return (
    <Page>
      <Wrapper withBg>
        <Paper>
          <Typography variant="h3">
            Do You want to start the Fun Quiz?
          </Typography>
          <NavLink className="primary-btn" to={user ? '/quiz' : '/login'}>
            Start Now
          </NavLink>
        </Paper>
      </Wrapper>
    </Page>
  )
}
export default Home
