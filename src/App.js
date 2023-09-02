import './App.css';
import Cal from './components/cal-heatmap.tsx';

function App() {
  return (
    <div className="App">
      <header>
        Basic React Example for the Javascript Charting Library <a href="https://cal-heatmap.com/">Cal-Heatmap</a>
      </header>
      <Cal />
    </div>   
  );
}

export default App;
