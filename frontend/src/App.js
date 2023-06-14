import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login';
import Register from './pages/Register';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/chatpage' element={<ChatPage/>}/> 
      </Routes>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
