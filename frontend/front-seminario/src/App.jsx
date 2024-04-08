import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Edit from './Pages/Edit'
import './App.css'

import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/Edit/:id" element={<Edit />} />
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App
