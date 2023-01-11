import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Form from './Componentes/Form';
import Answer from './Componentes/Answer';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Form/>}/>
          <Route path='/answer' element={<Answer/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
