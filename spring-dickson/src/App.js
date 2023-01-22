import logo from './logo.svg';
import './App.css';
import Spring from './components/Spring'
import Background from './components/background';

function App() {
  return (
    <div className="game">
      <Background className='fundo'></Background>
      <Spring className='SpringDickson'></Spring>
    </div>
  );
}

export default App;
