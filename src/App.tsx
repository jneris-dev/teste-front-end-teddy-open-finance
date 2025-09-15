import { BrowserRouter } from "react-router-dom";

import { Router } from "./router/Router";
import { AppContextProvider } from "./context/AppContext";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppContextProvider>
          <Router />
        </AppContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
