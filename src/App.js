import './App.css';
import Cal from './components/cal-heatmap.tsx';
import CalResponsive from './components/cal-heatmap-responsive.tsx';

function App() {
  return (
    <div className="App">
      <header>
        Basic React Example for the Javascript Charting Library <a href="https://cal-heatmap.com/">Cal-Heatmap</a>
      </header>
      {/* <h2>Basic Calendar</h2>
      <Cal /> */}
     
      <div id = "parent-div">
        <h2>Responsive Calendar</h2>
        <CalResponsive />
      </div>

    </div>   
  );
}

export default App;
