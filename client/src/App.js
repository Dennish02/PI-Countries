import './App.css';
import './normalize.css'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Countries from './components/Countries';
import LandingPage from './components/LandingPage';
import InfoCountry from './components/InfoCountry';
import PostExercise from './components/Exersice';


function App() {



  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/countries' element={<Countries />} />
          <Route exact path='/countries/:id' element={<InfoCountry />} />
          <Route path='/activity' element={< PostExercise />} />
        </Routes>
        <footer> <p> Powered By Hesler Dennis. | Todos los derechos reservados <img src={favicon} alt="Logo Henry" width="20px" /> Henry |</p>
          <p>Email: dennishesler02@gmail.com</p>
        </footer>
      </div>
    </BrowserRouter>
   
  );
}

export default App;
