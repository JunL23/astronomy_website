import Main_component from "./Main";
import NewsContainer from "./new_container";
import Weather_container from "./weather";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './Home.css'

// Home page of website
function Home() {
    return (
        <>
            <Header></Header>
            <div id="home-container">
                {/* weather widget */}
                <Weather_container></Weather_container>

                {/* Search widget */}
                <Main_component username={"User1"}/>

                {/* news widget */}
                <NewsContainer></NewsContainer>
            </div>
            <Footer></Footer>
        </>
    );
}


export default Home;