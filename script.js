const btn = document.getElementById("btn");
const list = document.getElementById("list");
const btnAllTasks = document.getElementById("allTasks");
const btnActiveTasks = document.getElementById("activeTasks");
const btnCompletedTasks = document.getElementById("completedTasks");
const btnsFilters = [btnAllTasks, btnActiveTasks, btnCompletedTasks];

btnsFilters.forEach((el) => {
    el.addEventListener("click", () => {
        btnsFilters.forEach((el) => el.classList.remove("activeBtn"));
        el.classList.add("activeBtn");
    });
});

//Наттройка фильтрации для кнопки Все задачи
btnAllTasks.addEventListener("click", () => {
    const freshFilterList = document.querySelectorAll(".content__task");
    for (let i = 0; i < freshFilterList.length; i++) {
        freshFilterList[i].classList.remove("dispNone");
    }
});

//Наттройка фильтрации для кнопки Активные
btnActiveTasks.addEventListener("click", () => {
    const freshFilterList = document.querySelectorAll(".content__task");
    for (let i = 0; i < freshFilterList.length; i++) {
        freshFilterList[i].classList.remove("dispNone");
        if (freshFilterList[i].classList.contains("taskDone")) {
            freshFilterList[i].classList.add("dispNone");
        }
    }
});

//Наттройка фильтрации для кнопки Выполненные
btnCompletedTasks.addEventListener("click", () => {
    const freshFilterList = document.querySelectorAll(".content__task");
    for (let i = 0; i < freshFilterList.length; i++) {
        freshFilterList[i].classList.remove("dispNone");
        if (freshFilterList[i].classList.contains("taskActive")) {
            freshFilterList[i].classList.add("dispNone");
        }
    }
});

//Настройка кнопки удаления задач
function deleteBtns() {
    const list = document.querySelector(".content__list");
    list.addEventListener("click", deleteBtnsClick);
}
function deleteBtnsClick(event) {
    const target = event.target;
    if (target.classList.contains("deleteBtns")) {
        target.closest(".content__task").remove();
        target.removeEventListener("click", deleteBtnsClick);
    }
}

//Настройка фунцкий для выполнения задачи
function finishBtns() {
    const list = document.querySelector(".content__list");
    list.addEventListener("click", finishBtnClick);
}

function finishBtnClick(event) {
    const target = event.target;

    if (target.classList.contains("finishBtns")) {
        const taskDiv = target.closest(".content__task");

        if (taskDiv.classList.contains("taskActive")) {
            taskDiv.classList.remove("taskActive");
            taskDiv.classList.add("taskDone");
        } else {
            taskDiv.classList.remove("taskDone");
            taskDiv.classList.add("taskActive");
        }
        // Удаляем слушатель после выполнения
        target.removeEventListener("click", finishBtnClick);
    }
}

btn.addEventListener("click", () => {
    const inpTitle = document.getElementById("inputTitle").value;
    const inpDesc = document.getElementById("inputDesc").value;
    const message = document.createElement("div");

    //Проверка есть ли хотя бы одно незаполненное поле
    if (!inpTitle || !inpDesc) {
        alert("Для добавления вашей задачи - проверьте заполненость полей ");
        return;
    }
    //Будем единожны добавлять класс для стилизации
    if (!list.classList.contains("content__list"))
        list.classList.add("content__list");

    message.classList.add("content__task");
    message.classList.add("taskActive");
    message.innerHTML = `
            <button onclick="finishBtns()" class="finishBtns">End</button>
            <div>
                <h3>${inpTitle}</h3>
                <p>${inpDesc}</p>
            </div>
            <button onclick="deleteBtns()" class="deleteBtns">Delete</button>
        `;
    list.appendChild(message);
    document.getElementById("inputTitle").value = "";
    document.getElementById("inputDesc").value = "";
    finishBtns();
});
