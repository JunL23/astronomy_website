import Main_component from "./Main";
import NewsContainer from "./new_container";
import Weather_container from "./weather";
import Header from "../../components/header";
import Footer from "../../components/footer";

function Home() {
    return (
        <>
            <Header></Header>
            <div id="home-container">
                <Weather_container></Weather_container>
                <Main_component username={"User1"}/>
                <NewsContainer></NewsContainer>
            </div>
            <Footer></Footer>
        </>
    );
}


export default Home;