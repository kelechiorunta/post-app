// import logo from './logo.svg';
import './App.css';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import Page2 from './components/Page2.jsx';
import Page1 from './components/Page1.jsx';
import Page3 from './components/Page3.jsx';
import Page4 from './components/Page4.jsx';
import Contact from './components/Contact.jsx';
import Album from './components/Album.jsx';


function App() {
  return (
    <div className="App">
      <header className="App-header max-w-full container">
        <Routes>
        <Route path='/' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />} >
          <Route path='/about' element={<Home/>} />
          <Route path='/dashboard' element={<Dashboard/>} >
            <Route index element={<Navigate to="page1" />} /> {/* Redirect to /dashboard/page1*/}
            <Route path="page1" element={<Page1/>} />
            <Route path="page2" element={<Page2 />} >
              <Route path="post/:id" element={<Page3/>} />
            </Route>
            <Route path="page4" element={<Page4/>} />
          </Route>
          <Route path='/contact/:id' element={<Contact/>} />
          <Route path='/album' element={<Album/>} />
        </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
