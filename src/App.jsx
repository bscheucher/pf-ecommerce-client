import "./styles/App.css";
import Home from "./pages/Home";
import NavBar from "./components/Shared/NavBar";
import Footer from "./components/Shared/Footer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Start developing e-commerce app.</p>
      </header>
      <NavBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
