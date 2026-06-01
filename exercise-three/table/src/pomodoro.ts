type Task = {
  taskName: string;
  pomodoroDone: number;
  pomodoroCount: number;
  finished: boolean;
};

const tasks: Task[] = [
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

const pomodoroForm = document.querySelector<HTMLFormElement>(".js-add-task");
const pomodoroTableBody =
  document.querySelector<HTMLTableSectionElement>(".js-task-table-body");

function renderTasks(): void {
  if (!pomodoroTableBody) return;

  pomodoroTableBody.innerHTML = tasks
    .map(({ taskName, pomodoroDone, pomodoroCount, finished }, id) => {
      return `
        <tr>
          <td>${taskName}</td>

          <td>
            ${pomodoroDone} / ${pomodoroCount} pomodori
          </td>

          <td>
            <div class="action-buttons">
              ${
                finished
                  ? `<span class="finished">Finished</span>`
                  : `
                    <button class="js-task-done" data-id="${id}">
                      Done
                    </button>

                    <button class="js-increase-pomodoro" data-id="${id}">
                      Increase Pomodoro Count
                    </button>
                  `
              }

              <button class="js-delete-task" data-id="${id}">
                Delete Task
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function addTask(event: SubmitEvent): void {
  event.preventDefault();

  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) return;

  const taskNameInput =
    form.querySelector<HTMLInputElement>(".js-task-name");
  const pomodoroCountInput =
    form.querySelector<HTMLInputElement>(".js-pomodoro-count");

  if (!taskNameInput || !pomodoroCountInput) return;

  const taskName = taskNameInput.value.trim();
  const pomodoroCount = Number(pomodoroCountInput.value);

  if (!taskName || !Number.isFinite(pomodoroCount) || pomodoroCount <= 0) {
    return;
  }

  const newTask: Task = {
    taskName,
    pomodoroDone: 0,
    pomodoroCount,
    finished: false,
  };

  tasks.push(newTask);

  renderTasks();
  form.reset();
}

function finishTask(taskId: number): void {
  if (!tasks[taskId]) return;
  tasks[taskId].finished = true;
}

function increasePomodoro(taskId: number): void {
  if (!tasks[taskId]) return;
  tasks[taskId].pomodoroDone++;
}

function deleteTask(taskId: number): void {
  if (!tasks[taskId]) return;
  tasks.splice(taskId, 1);
}

function handleTaskButtonClick(event: Event): void {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const taskId = Number(target.dataset.id);

  if (!Number.isFinite(taskId)) return;

  if (target.matches(".js-task-done")) {
    finishTask(taskId);
  } else if (target.matches(".js-increase-pomodoro")) {
    increasePomodoro(taskId);
  } else if (target.matches(".js-delete-task")) {
    deleteTask(taskId);
  }

  renderTasks();
}

if (pomodoroForm) {
  pomodoroForm.addEventListener("submit", addTask);
}

if (pomodoroTableBody) {
  pomodoroTableBody.addEventListener("click", handleTaskButtonClick);
}

renderTasks();
