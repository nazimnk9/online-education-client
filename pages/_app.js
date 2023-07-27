import TopNav from '../components/TopNav';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'antd/dist/antd.css';
import '../public/css/styles.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import axios from "axios";
function MyApp ({Component, pageProps}) {
  axios.defaults.baseURL = 'https://online-education-server.onrender.com';
    return (
        <Provider>
          <ToastContainer position="top-center" />
          <TopNav />
          <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;

// export default function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// };
