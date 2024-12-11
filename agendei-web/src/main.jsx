import { createRoot } from 'react-dom/client'
import Login from './pages/login/login.jsx'
//import Register from './pages/register/register.jsx'
//import Appointments from './pages/appointments/appointments.jsx'
import "./styles/global.css"

createRoot(document.getElementById('root')).render(
  <div>
    <Login/>
    {/*<Register />*/}
    {/*<Appointments />*/}
  </div>
)
