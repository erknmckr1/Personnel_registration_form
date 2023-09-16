import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-[#FEF9E7]">
      <ToastContainer />
      <Component {...pageProps} />
    </div>
  );
}
