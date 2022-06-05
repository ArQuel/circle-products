import styles from './app.module.css'
import Navbar from './components/navbar/navbar';
import Chemin from './route/route';

/**
    * This component is the main one of the App. It will render the navbar, and get the root to render a component according the URL.
    * @function
*/

function App() {
  return (
    <div className={styles.App}>
      <Navbar></Navbar>
      <Chemin />
    </div>
  );
}

export default App;
