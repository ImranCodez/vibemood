import "../globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default async function Layout({ children }) {
    
    let user = []
    let categories = []
    return (
        <>
            <Navbar user={user} cart={0} categories={categories?.data} />
            {children}
            <Footer />
        </>
    );
} 
