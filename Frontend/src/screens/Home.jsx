import { useContext } from 'react'
import { UserContext } from '../context/user.context'

const Home = () => {
    
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>This is the home page.</p>
    </div>
  )
}

export default Home