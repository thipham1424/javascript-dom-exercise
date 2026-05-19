const tasks = [
  {
    taskName: "Write pomodoro app",
    pomodoroDone: 2,
    pomodoroCount: 4,
    finished: true,
  },
  {
    taskName: "Write pomodoro article",
    pomodoroDone: 4,
    pomodoroCount: 4,
    finished: false,
  },
  {
    taskName: "Create thumbnail",
    pomodoroDone: 1,
    pomodoroCount: 1,
    finished: false,
  },
  {
    taskName: "Proof-read article",
    pomodoroDone: 1,
    pomodoroCount: 1,
    finished: false,
  },
];

const pomodoroForm = document.querySelector(".js-add-task");

const pomodoroTableBody = document.querySelector(".js-task-table-body");

const renderTasks = () => {
  pomodoroTableBody.innerHTML = tasks
    .map(({ taskName, pomodoroDone, pomodoroCount, finished }, id) => {
      return `
          <tr>
            <!-- TASK NAME -->
            <td>
              ${taskName}
            </td>

            <!-- STATUS -->
            <td>
              ${pomodoroDone}
              /
              ${pomodoroCount}
              pomodori
            </td>

            <!-- CONTROLS -->
            <td>
              <div class="action-buttons">
                ${
                  finished
                    ? `
                      <span class="finished">
                        Finished
                      </span>
                    `
                    : `
                      <button
                        class="js-task-done"
                        data-id="${id}"
                      >
                        Done
                      </button>

                      <button
                        class="js-increase-pomodoro"
                        data-id="${id}"
                      >
                        Increase Pomodoro Count
                      </button>
                    `
                }

                <button
                  class="js-delete-task"
                  data-id="${id}"
                >
                  Delete Task
                </button>
              </div>
            </td>
          </tr>
        `;
    })
    .join("");
};

const addTask = (event) => {
  event.preventDefault();

  const taskNameInput = document.querySelector(".js-task-name");

  if (!taskNameInput) {
    return;
  }

  const pomodoroCountInput = document.querySelector(".js-pomodoro-count");

  if (!pomodoroCountInput) {
    return;
  }

  const taskName = taskNameInput.value;

  const pomodoroCount = Number(pomodoroCountInput.value);

  const newTask = {
    taskName,
    pomodoroDone: 0,
    pomodoroCount,
    finished: false,
  };

  tasks.push(newTask);

  renderTasks();

  pomodoroForm.reset();
};

if (pomodoroForm) {
  pomodoroForm.addEventListener("submit", addTask);
}

const finishTask = (taskId) => {
  tasks[taskId].finished = true;
};

const increasePomodoro = (taskId) => {
  tasks[taskId].pomodoroDone++;
};

const deleteTask = (taskId) => {
  tasks.splice(taskId, 1);
};

const handleTaskButtonClick = (event) => {
  const taskId = Number(event.target.dataset.id);

  if (event.target.matches(".js-task-done")) {
    finishTask(taskId);
  } else if (event.target.matches(".js-increase-pomodoro")) {
    increasePomodoro(taskId);
  } else if (event.target.matches(".js-delete-task")) {
    deleteTask(taskId);
  }

  renderTasks();
};

if (pomodoroTableBody) {
  pomodoroTableBody.addEventListener(
    "click",
    handleTaskButtonClick
  );
}

renderTasks();
