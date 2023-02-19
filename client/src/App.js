import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "pages/homePage/homePage";
import LoginPage from "pages/loginPage/loginPage";
import ProfilePage from "pages/profilePage/profilePage";
import NavBar from "components/navbar/navbar";
import { ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, CssBaseline } from "@mui/material";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isLogged = useSelector((state) => state.token);
  return (
    <div className='App'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <NavBar />
          <CssBaseline />
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<HomePage />} />
            <Route
              path='/profile/:id'
              element={isLogged ? <ProfilePage /> : <Navigate to='/login' />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
