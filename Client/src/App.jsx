import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

function App() {
  return (
    <>
      <div>
        {/* <h1>Dr.Clean</h1> */}
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
