document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Add new task
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let taskText = taskInput.value;
        if (!taskText) return;

        fetch("/add_task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: taskText }),
        })
        .then(response => response.json())
        .then(data => {
            let newTask = document.createElement("li");
            newTask.classList.add("task-item");
            newTask.setAttribute("data-id", data.id);
            newTask.innerHTML = `${data.task} <span class="delete-btn">❌</span>`;
            taskList.appendChild(newTask);
            taskInput.value = "";
        });
    });

    // Delete task
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            let taskItem = event.target.parentElement;
            let taskId = parseInt(taskItem.getAttribute("data-id"));

            fetch("/delete_task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: taskId }),
            })
            .then(response => response.json())
            .then(() => {
                taskItem.remove();  // Remove from UI
            });
        }
    });
});
