import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/NotFound.css';

export default function NotFound(){
    return (<>
                <Header />
                <div className="notfound">404 | NOT FOUND</div>
                <Footer />
            </>)
}