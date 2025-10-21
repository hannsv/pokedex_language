import "./App.css";
import TopNavBar from "./components/nav/TopNavBar";
import PokedexMainScreen from "./pages/main/PokedexMainScreen";

function App() {
  return (
    <div className="App">
      <TopNavBar />
      <PokedexMainScreen />
    </div>
  );
}

export default App;
