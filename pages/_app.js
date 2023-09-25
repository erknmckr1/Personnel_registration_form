import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/context/context";


export default function App({ Component, pageProps }) {
  return (
    <div className="">
        <UserProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </UserProvider>
    </div>
  );
}
