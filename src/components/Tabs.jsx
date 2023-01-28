import { createEffect, createSignal } from "solid-js";
import Input from "./Input";
import styles from "./Tabs.module.css";
import TaskList from "./TaskList";
function Tabs() {
  const [active, setActive] = createSignal(0);
  const [tasks, setTasks] = createSignal(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  createEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks()));
  });

  const getTasks = () => {
    if (active() === 0) {
      return tasks();
    } else if (active() === 1) {
      return tasks().filter((task) => !task.isComplete);
    } else {
      return tasks().filter((task) => task.isComplete);
    }
  };

  return (
    <div class={styles.tabContainer}>
      <div class={styles.tabList}>
        <button
          onClick={() => setActive(0)}
          classList={{ [styles.tab]: true, [styles.tabActive]: active() === 0 }}
        >
          All
        </button>
        <button
          onClick={() => setActive(1)}
          classList={{ [styles.tab]: true, [styles.tabActive]: active() === 1 }}
        >
          Active
        </button>
        <button
          onClick={() => setActive(2)}
          classList={{ [styles.tab]: true, [styles.tabActive]: active() === 2 }}
        >
          Completed
        </button>
      </div>
      <Input
        addTask={(task) =>
          setTasks([
            ...tasks(),
            { value: task, isComplete: false, id: Date.now() },
          ])
        }
      />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        active={active}
        activeTasks={getTasks}
      />
    </div>
  );
}

export default Tabs;
