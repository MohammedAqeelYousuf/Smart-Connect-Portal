import Navbar from './components/Navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './pages/Admin.js';

function App() {
  return (
    <>
      <header>
        <Navbar />
        <Admin />
      </header>
    </>
  );
}

export default App;
