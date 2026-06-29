import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/user.context'

const App = () => {
  return (
    <UserProvider>
      <Toaster
        position="top-right"
        richColors
        duration={4000}
      />
      <AppRoutes />
    </UserProvider>
  )
}

export default App
