import { createSignal, Show } from "solid-js";
import styles from "./TaskList.module.css";

function TaskList(props) {
  const [editId, setEditId] = createSignal(null);
  const handleTaskClick = (id) => {
    props.setTasks(
      props.tasks().map((task) => ({
        ...task,
        isComplete: task.id === id ? !task.isComplete : task.isComplete,
      }))
    );
  };

  const removeTask = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    props.setTasks(props.tasks().filter((task) => task.id !== id));
  };

  const editTask = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    setEditId(id);
  };

  return (
    <ul class={styles.tasksList}>
      <For
        each={props.activeTasks()}
        fallback={
          <div class={styles.tasksEmpty}>
            <span class="material-symbols-outlined">home_storage</span>
            <Switch>
              <Match when={props.active() === 0}>
                <h3>Your ToDo List is Empty</h3>
                <p>What do you want to get done today.</p>
              </Match>
              <Match when={props.active() === 1}>
                <h3>Great Job</h3>
                <p>You have successfully completed all of your tasks!</p>
              </Match>
              <Match when={props.active() === 2}>
                <h3>Let's Start</h3>
                <p>Let's tackle some tasks and get them done.</p>
              </Match>
            </Switch>
          </div>
        }
      >
        {(task, i) => (
          <li
            role="button"
            tabIndex={0}
            onKeyUp={(e) => e.key === "Enter" && handleTaskClick(task.id)}
            onClick={() => handleTaskClick(task.id)}
            class={styles.taskItem}
          >
            <div
              classList={{
                [styles.complete]: task.isComplete,
                [styles.taskCheckbox]: true,
              }}
            ></div>
            <Show
              when={editId() === task.id}
              fallback={
                <p classList={{ [styles.completeText]: task.isComplete }}>
                  {task.value}
                </p>
              }
            >
              <input class={styles.input} value={task.value} />
            </Show>

            {task.isComplete && (
              <button
                onClick={(e) => removeTask(e, task.id)}
                class={styles.actionButton}
                aria-label="Delete Task"
              >
                <span
                  class={`material-symbols-outlined ${styles.taskActionIcon}`}
                >
                  delete
                </span>
              </button>
            )}
          </li>
        )}
      </For>
    </ul>
  );
}
export default TaskList;
