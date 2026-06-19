import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
// import { Outlet } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
{/* doubt in {children} and {Outlet} */}
{/* ye mainLayout ka use App.jsx me hua h isliye wahi kaake samjh aayege ki 
MinLayout ke ander wrap kiya hua component hi children h */}
      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;