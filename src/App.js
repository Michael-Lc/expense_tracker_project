import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Providers from './contexts';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import AccountSettings from "./pages/AccountSettings";
import RequireAuth from "./components/redirects/RequireAuth";
import RequireValidation from "./components/redirects/RequireValidation";
import Export from "./pages/Export";

function App() {

  return (
    <Router>
      <Providers>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path='/' element={<Home />} />
            <Route path='/exports' element={<Export />} />
            <Route path='/account-settings' element={<AccountSettings />} />
          </Route>

          <Route element={<RequireValidation />}>
            <Route path='/signin' element={<SignIn />} />
          </Route>

          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Providers>
    </Router>
  );
}

export default App;
