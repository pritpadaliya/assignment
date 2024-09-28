import Insert from './Component/Insert';
import Update from './Component/Update';
import Home from './Pages/Home';
import {BrowserRouter ,Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/insert" element={<Insert />} />
            <Route path="/edit/:id" element={<Update />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
