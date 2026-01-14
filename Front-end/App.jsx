import './App.css'
import ListEmpComponent from './component/ListEmpComponent'
import HeaderComponent from './component/HeaderComponent'
import FooterComponent from './component/FooterComponent'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import EmployeeComponent from './component/EmployeeComponent'
//The curly braces {} are used to embed JavaScript expressions inside JSX.
// curly braces tell React: "This is JavaScript, not text!"

function App() {
  return (
    <>
    <BrowserRouter>
    <HeaderComponent />
    <Routes>
      {/* https://localhost:3000 */}
      //Visit localhost:5173/ → Should show employee list
       <Route path='/' exact element={<ListEmpComponent />} />
        {/* https://localhost:3000/add-employee */}
        // Visit localhost:5173/add-employee → Should show add form
        <Route path='/add-employee' exact element={<EmployeeComponent />} ></Route>
        {/* https://localhost:3000/edit-employee/:id */}
        // Visit localhost:5173/edit-employee/5 → Should show edit form
        <Route path='/edit-employee/:id' exact element={<EmployeeComponent />} ></Route>
    </Routes>
    
    <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App