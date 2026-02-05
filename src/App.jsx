import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import AdminPage from './pages/adminPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/register'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './pages/forgetPassword'

function App() {
 

  return (
    <GoogleOAuthProvider clientId="452872842637-njhb9p477klhh55ebs9v0qgdf30ufqc0.apps.googleusercontent.com">
      <BrowserRouter>
        <div >
          <Toaster position='top-right'/>
          <Routes path="/*">
            <Route path='/login' element={<LoginPage/>}/>
            <Route path="/forget" element={<ForgetPasswordPage/>}/>
            <Route path="/signup" element={<RegisterPage/>}/>
            <Route path='/admin/*' element={<AdminPage/>}/>
            <Route path='/*' element={<HomePage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
    
  )
}

export default App