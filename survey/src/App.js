import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
