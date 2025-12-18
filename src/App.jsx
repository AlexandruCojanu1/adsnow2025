import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Routers";
import Navbar from "./Components/Header/header";
import Footer from "./Components/Footer/footer";
import Sidebar from "./Components/Sidebar/Sidebar";
import { ModalVideoProvider } from "./Components/Video/ModalVideoContext";
import { NavProvider } from "./Components/Context/NavContext";

function App(){
    return (
        <Router>
            <NavProvider>    
                <ModalVideoProvider>
                    <Navbar />
                    <Sidebar />
                    <AppRouter />
                    <Footer />
                </ModalVideoProvider>
            </NavProvider>
        </Router>
    );
}

export default App;