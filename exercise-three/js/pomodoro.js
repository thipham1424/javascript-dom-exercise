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

const pomodoroTableBody = document.querySelector(
  ".js-task-table-body"
);

function renderTasks() {
  pomodoroTableBody.innerHTML = tasks
    .map((task, id) => {
      return `
        <tr>

          <!-- TASK NAME -->
          <td>
            ${task.taskName}
          </td>

          <!-- STATUS -->
          <td>
            ${task.pomodoroDone}
            /
            ${task.pomodoroCount}
            pomodori
          </td>

          <!-- CONTROLS -->
          <td>

            <div class="action-buttons">

              ${
                task.finished
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
}

function addTask(event) {
  event.preventDefault();

  const taskName = document.querySelector(
    ".js-task-name"
  ).value;

  const pomodoroCount = Number(
    document.querySelector(".js-pomodoro-count").value
  );

  const newTask = {
    taskName,
    pomodoroDone: 0,
    pomodoroCount,
    finished: false,
  };

  tasks.push(newTask);

  renderTasks();

  pomodoroForm.reset();
}

pomodoroForm.addEventListener("submit", addTask);

function finishTask(taskId) {
  tasks[taskId].finished = true;
}

function increasePomodoro(taskId) {
  tasks[taskId].pomodoroDone++;
}

function deleteTask(taskId) {
  tasks.splice(taskId, 1);
}

function handleTaskButtonClick(event) {
  const taskId = event.target.dataset.id;

  if (event.target.matches(".js-task-done")) {
    finishTask(taskId);
  } else if (
    event.target.matches(".js-increase-pomodoro")
  ) {
    increasePomodoro(taskId);
  } else if (
    event.target.matches(".js-delete-task")
  ) {
    deleteTask(taskId);
  }

  renderTasks();
}

pomodoroTableBody.addEventListener(
  "click",
  handleTaskButtonClick
);

renderTasks();
