import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Countries from './components/Countries';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <BrowserRouter>
       <div className="App">
         <Routes>
            <Route exact path='/' element={<LandingPage/>}/>
            <Route exact path='/countries' element={<Countries/>}/>
         </Routes>
    
      </div>
    </BrowserRouter>
   
  );
}

export default App;
