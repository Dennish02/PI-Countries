import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Countries from './components/Countries';
import LandingPage from './components/LandingPage';
import InfoCountry from './components/InfoCountry';

function App() {
  return (
    <BrowserRouter>
       <div className="App">
         <Routes>
            <Route exact path='/' element={<LandingPage/>}/>
            <Route exact path='/countries' element={<Countries/>}/>
            <Route exact path='/countries/:id' element={<InfoCountry/>}/>
         </Routes>
    
      </div>
    </BrowserRouter>
   
  );
}

export default App;
