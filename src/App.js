import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { router } from "./Routes";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./styles/mixins/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrimeReactProvider } from "primereact/api";

import ComponentBoundLoader from "./Pages/common/Loader/CompLoader";
function App() {
  return (
    <>
      <PrimeReactProvider>
        <ComponentBoundLoader />
        <Toaster
          containerStyle={{
            zIndex: "999999999999999999999999999",
          }}
        />
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </>
  );
}

export default App;
