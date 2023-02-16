import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "pages/homePage/homePage";
import LoginPage from "pages/loginPage/loginPage";
import ProfilePage from "pages/profilePage/profilePage";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
