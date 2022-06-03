import styles from './app.module.css'
import Navbar from './components/navbar/navbar';
import Chemin from './route/route';

function App() {
  return (
    <div className={styles.App}>
      <Navbar></Navbar>
      <Chemin />
    </div>
  );
}

export default App;
