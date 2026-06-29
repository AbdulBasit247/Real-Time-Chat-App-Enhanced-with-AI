import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user.context'
import axios from '../config/axios'
import { toast } from 'sonner'

// A helper to parse errors coming from the backend
function parseBackendError(err) {
    const data = err.response?.data

    if (!data) return 'Network error. Please try again.'

    // express-validator wali errors: { errors: [ { msg: '...' }, ... ] }
    if (data.errors && Array.isArray(data.errors)) {
        return data.errors.map(e => e.msg).join(', ')
    }

    // Single string errors: { errors: 'Invalid credentials' }
    if (typeof data.errors === 'string') return data.errors

    // Generic message field
    if (data.message) return data.message

    // Plain string response (res.status(400).send(err.message))
    if (typeof data === 'string') return data

    return 'Something went wrong. Please try again.'
}

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    function submitHandler(e) {
        e.preventDefault()

        if (!email || !password) {
            toast.error('Please fill in all fields')
            return
        }

        setLoading(true)

        axios.post('/api/users/register', { email, password })
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                setUser(res.data.user)
                toast.success('Registration successful!')
                navigate('/')
            })
            .catch((err) => {
                toast.error(parseBackendError(err))
            })
            .finally(() => setLoading(false))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6">Register</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="text-gray-400 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register