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

    $btnKick.addEventListener('click', function () {
        console.log('Thunder Jolt');
        fight(random(10), random(10), character, enemy1, enemy2);
    });

    $btnSpecialKick.addEventListener('click', function () {
        console.log('Thunder Shock');
        fight(random(20), random(15), character, enemy1, enemy2);
    });

    $btnHeavyAttack.addEventListener('click', function () {
        console.log('Iron Tail');
        fight(random(30), random(25), character, enemy1, enemy2);
    });

    function init() {
        console.log('Start Game!');
        renderHPLife(character); 
        renderHPLife(enemy1); 
        renderHPLife(enemy2); 
    }

    init();

    function renderHPLife(person) {
        const $healthText = document.getElementById(`health-${person.name.toLowerCase()}`);
        const $progressbar = document.getElementById(`progressbar-${person.name.toLowerCase()}`);

        if (!$healthText || !$progressbar) {
            console.error(`Element for ${person.name} not found.`);
            return;
        }

        $healthText.innerText = person.damageHP + '/' + person.defaultHP;
        $progressbar.style.width = (person.damageHP * 100 / person.defaultHP) + '%';

        if (person.damageHP < person.defaultHP * 0.3) {
            $progressbar.style.backgroundColor = 'red';
        } else if (person.damageHP < person.defaultHP * 0.6) {
            $progressbar.style.backgroundColor = 'yellow';
        } else {
            $progressbar.style.backgroundColor = 'green';
        }
    }

    function changeHP(count, person) {
        person.damageHP -= count;

        if (person.damageHP <= 0) {
            person.damageHP = 0;
            alert(`${person.name} проиграл!`);
            disableButtons();
        }

        renderHPLife(person);
    }


    function random(num) {
        return Math.ceil(Math.random() * num);
    }

    function disableButtons() {
        $btnKick.disabled = true;
        $btnSpecialKick.disabled = true;
        $btnHeavyAttack.disabled = true;
    }


    function fight(damageToEnemy1, damageToEnemy2, character, enemy1, enemy2) {
        changeHP(damageToEnemy1, enemy1); 
        changeHP(damageToEnemy2, enemy2);  

        const randomEnemy = Math.random() > 0.5 ? enemy1 : enemy2;
        const damageFromEnemy = random(15);
        console.log(`${randomEnemy.name} атакует Pikachu и наносит ${damageFromEnemy} урона!`);
        changeHP(damageFromEnemy, character); 
    }
});
