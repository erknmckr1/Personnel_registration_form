import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/context/userContext";
import { CılaProvider } from "@/context/cilaContext";

export default function App({ Component, pageProps }) {
  return (
    <div className="">
      <UserProvider>
        <CılaProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </CılaProvider>
      </UserProvider>
    </div>
  );
}
