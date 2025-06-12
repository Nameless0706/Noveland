import './css/App.css'
import Login from './pages/Auth/Login'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'

function App() {

    return (<>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}/>

          </Routes>
        </>
    )
    
}

export default App
