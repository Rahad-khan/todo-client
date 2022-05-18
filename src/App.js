import './App.css';
import Todo from './components/Todo';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Header from './components/Header/Header';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="px-12">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route
          path="/todo"
          element={
            <RequireAuth>
              <Todo />
            </RequireAuth>
          }
        ></Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
