// Модальное окно
var modal = document.getElementById("nicknameModal");
var btn = document.getElementById("registerButton");
var span = document.getElementsByClassName("close")[0];
var submitBtn = document.getElementById("submitNickname");
var nicknameInput = document.getElementById("nicknameInput");
var playersTable = document.getElementById("playersTable");

var players = JSON.parse(localStorage.getItem('players')) || []; // Загрузка сохраненных игроков
var maxPlayers = 8; // Максимальное количество игроков
var registered = localStorage.getItem('registered') || false; // Проверка, зарегистрирован ли текущий пользователь

// Функция для скрытия кнопки после регистрации
function checkRegistration() {
    if (registered || players.length >= maxPlayers) {
        btn.style.display = "none"; // Скрываем кнопку, если пользователь зарегистрирован или все места заняты
    }
}

// Открытие модального окна при нажатии на кнопку
btn.onclick = function() {
    if (players.length < maxPlayers && !registered) {
        modal.style.display = "block";
    } else {
        alert("Упс. Места в турнире закончились");
    }
}

// Закрытие модального окна при нажатии на крестик
span.onclick = function() {
    modal.style.display = "none";
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Добавление игрока в таблицу при нажатии "Подтвердить"
submitBtn.onclick = function() {
    var nickname = nicknameInput.value.trim();
    if (nickname === "") {
        alert("Пожалуйста, введите никнейм.");
        return;
    }

    if (players.length >= maxPlayers) {
        alert("Упс. Места в турнире закончились");
        modal.style.display = "none";
        return;
    }

    if (!registered) {
        players.push(nickname);
        localStorage.setItem('players', JSON.stringify(players)); // Сохраняем список игроков в localStorage
        localStorage.setItem('registered', true); // Отмечаем, что пользователь зарегистрирован
        registered = true; // Устанавливаем флаг
        updatePlayersTable();
        modal.style.display = "none";
        nicknameInput.value = ""; // Очистка поля ввода
        checkRegistration(); // Проверяем, нужно ли скрыть кнопку
    }
}

// Обновление таблицы с игроками
function updatePlayersTable() {
    playersTable.innerHTML = ""; // Очистка таблицы

    players.forEach(function(player, index) {
        var row = document.createElement("tr");

        var cellNumber = document.createElement("td");
        cellNumber.textContent = index + 1;
        row.appendChild(cellNumber);

        var cellNickname = document.createElement("td");
        cellNickname.textContent = player;
        row.appendChild(cellNickname);

        playersTable.appendChild(row);
    });
}

// Инициализация таблицы и проверка кнопки при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
    updatePlayersTable(); // Обновление таблицы
    checkRegistration(); // Проверяем, нужно ли скрыть кнопку
});
