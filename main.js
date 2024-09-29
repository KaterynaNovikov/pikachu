document.addEventListener("DOMContentLoaded", function() {
    const $btnKick = document.getElementById('btn-kick');
    const $btnSpecialKick = document.getElementById('btn-special-kick');
    const $btnHeavyAttack = document.getElementById('btn-heavy-attack');

    const character = {
        name: "Pikachu",
        defaultHP: 100,
        damageHP: 100,
    }

    const enemy1 = {
        name: 'Charmander',
        defaultHP: 100,
        damageHP: 100,
    }

    const enemy2 = {
        name: 'Bulbasaur',
        defaultHP: 100,
        damageHP: 100,
    }

    // Универсальная функция для атаки
    function attack(target, damage) {
        target.damageHP -= damage;
        if (target.damageHP < 0) target.damageHP = 0;
        renderHPLife(target);

        if (target.damageHP === 0) {
            alert(`${target.name} проиграл!`);
            disableButtons();
        }
    }

    // Универсальная функция для случайной атаки врагов на Pikachu
    function enemyAttack(character) {
        const randomEnemy = Math.random() > 0.5 ? enemy1 : enemy2;
        const damageFromEnemy = random(10); // Случайный урон от 0 до 10
        console.log(`${randomEnemy.name} атакует Pikachu и наносит ${damageFromEnemy} урона!`);
        attack(character, damageFromEnemy);
    }

    // Обработчики событий для кнопок
    $btnKick.addEventListener('click', function () {
        console.log('Thunder Jolt');
        fight(random(10), random(10));
    });

    $btnSpecialKick.addEventListener('click', function () {
        console.log('Thunder Shock');
        fight(random(20), random(15));
    });

    $btnHeavyAttack.addEventListener('click', function () {
        console.log('Iron Tail');
        fight(random(30), random(25));
    });

    function fight(damageToEnemy1, damageToEnemy2) {
        // Pikachu атакует врагов
        attack(enemy1, damageToEnemy1); 
        attack(enemy2, damageToEnemy2);  
        
        // Враги атакуют Pikachu
        enemyAttack(character);
    }

    // Инициализация игры
    function init() {
        console.log('Start Game!');
        renderHPLife(character); 
        renderHPLife(enemy1); 
        renderHPLife(enemy2); 
    }

    init();

    // Функция отображения HP на прогресс-баре
    function renderHPLife(person) {
        const $healthText = document.getElementById(`health-${person.name.toLowerCase()}`);
        const $progressbar = document.getElementById(`progressbar-${person.name.toLowerCase()}`);

        if (!$healthText || !$progressbar) {
            console.error(`Element for ${person.name} not found.`);
            return;
        }

        $healthText.innerText = `${person.damageHP} / ${person.defaultHP}`;
        $progressbar.style.width = `${(person.damageHP * 100 / person.defaultHP)}%`;

        if (person.damageHP < person.defaultHP * 0.3) {
            $progressbar.style.backgroundColor = 'red';
        } else if (person.damageHP < person.defaultHP * 0.6) {
            $progressbar.style.backgroundColor = 'yellow';
        } else {
            $progressbar.style.backgroundColor = 'green';
        }
    }

    // Функция случайного числа
    function random(num) {
        return Math.ceil(Math.random() * num);
    }

    // Отключаем кнопки после завершения игры
    function disableButtons() {
        $btnKick.disabled = true;
        $btnSpecialKick.disabled = true;
        $btnHeavyAttack.disabled = true;
    }
});
