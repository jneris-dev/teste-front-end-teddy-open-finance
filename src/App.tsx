import { BrowserRouter } from "react-router-dom";

import { Router } from "./router/Router";
import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Router />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
