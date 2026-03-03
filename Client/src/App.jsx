import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";
import { AuthProvider } from "./Context/AuthContext";
import WhatsAppButton from "./Components/WhatsAppButton";
function App() {
  return (
    <>
      <div>
        <AuthProvider>
          {/* <h1>Dr.Clean</h1> */}
          <WhatsAppButton />
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
