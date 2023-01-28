import styles from "./App.module.css";
import Tabs from "./components/Tabs";

function App() {
  return (
    <div class={styles.App}>
      <h1 class={styles.header}>Todo Application</h1>
      <Tabs />
    </div>
  );
}

export default App;
