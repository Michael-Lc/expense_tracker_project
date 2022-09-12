import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Providers from './contexts';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import AccountSettings from "./pages/AccountSettings";

function App() {

  return (
    <Router>
      <Providers>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/account-settings' element={<AccountSettings />} />
        </Routes>
      </Providers>
    </Router>
  );
}

export default App;
