import { RouterProvider } from "react-router-dom";
import { route } from "./Routes/RouterComponent";

function App() {
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
