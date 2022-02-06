import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import store from "../redux/store";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Navbar></Navbar>
            <Component {...pageProps} />
            <Footer></Footer>
        </Provider>
    )
}

export default MyApp
