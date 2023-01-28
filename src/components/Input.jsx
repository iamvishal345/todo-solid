import { createSignal } from "solid-js";
import styles from "./Input.module.css";

function Input({ addTask }) {
  const [task, setTask] = createSignal("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task()) {
      addTask(task());
      setTask("");
    }
  };

  return (
    <form class={styles.inputContainer} onSubmit={handleAddTask}>
      <div class={styles.inputBox}>
        <input
          id="taskInput"
          name="taskInput"
          classList={{ [styles.active]: task(), [styles.input]: true }}
          value={task()}
          onChange={(e) => setTask(e.target.value)}
        />
        <label class={styles.inputLabel} for="taskInput">
          What is Your Next Task?
        </label>
      </div>
      <button type="submit" class={styles.addButton} aria-label="Add Task">
        <span class="material-symbols-outlined">add</span>
      </button>
    </form>
  );
}

export default Input;
