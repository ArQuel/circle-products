import styles from './app.module.css'
import Home from './components/home/home'
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <div className={styles.App}>
      <Navbar></Navbar>
      <Home></Home>
    </div>
  );
}

export default App;
