import logo from './logo.svg';
import './App.css';
import CoinChangeVisualizer from './components/coin-change-interactive';
import CoinChangeVisualizerSetExpansion from './components/coin-change-set-expansion';

function App() {
  return (
    <div className="App">
      <CoinChangeVisualizer />
      <CoinChangeVisualizerSetExpansion />
    </div>
  );
}

export default App;
