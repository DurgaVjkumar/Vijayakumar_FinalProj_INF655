import './App.css';
import HomePage from './components/pages/HomePage';
import Header from './Header';
import Nav from './Nav';


function App() {
  return (
    <div className="App">
     <Header></Header>
     <Nav></Nav>
     <HomePage></HomePage>
    </div>
  );
}

export default App;
