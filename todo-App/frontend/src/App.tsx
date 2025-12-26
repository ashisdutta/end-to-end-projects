import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import TodosPage from './pages/TodosPage'
import AddTodoPage from './pages/AddTodoPage'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App(){
  return(
  <>
     <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage/>}></Route>
        <Route path="/signin" element={<SigninPage/>}></Route>
        <Route path="/todos" element={<TodosPage/>}></Route>
        <Route path="/add-todo" element={<AddTodoPage/>}></Route>
      </Routes>
     </BrowserRouter>
  </>
  )
}
//<Route path="/todo/:id" element={<TodosPage/>}></Route>
export default App;