const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

// Константы
const WIDTH = 950;
const HEIGHT = 750;
const GRAVITY = 1;
const BALL_RADIUS = 7;
const SEGMENT_THICKNESS = 6;

// Создаем движок
const engine = Engine.create();
engine.world.gravity.y = GRAVITY;
const { world } = engine;

// Рендеринг
const canvas = document.getElementById('gameCanvas');
const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: WIDTH,
        height: HEIGHT,
        wireframes: false,
        background: 'black',
    },
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Создаем стены
const walls = [
    Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 20, { isStatic: true, render: { fillStyle: 'darkslategray' } }),
    Bodies.rectangle(0, HEIGHT / 2, 20, HEIGHT, { isStatic: true }),
    Bodies.rectangle(WIDTH, HEIGHT / 2, 20, HEIGHT, { isStatic: true }),
];
World.add(world, walls);

// Функция для создания шаров
function createBall() {
    const ball = Bodies.circle(
        Math.random() * WIDTH,
        Math.random() * HEIGHT / 4,
        BALL_RADIUS,
        {
            restitution: 0.1,
            friction: 0.1,
            render: { fillStyle: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` },
        }
    );
    World.add(world, ball);
}

// Создаем шары
for (let i = 0; i < 500; i++) {
    createBall();
}

// Создаем платформы и колышки
function createSegment(x1, y1, x2, y2, color) {
    const segment = Bodies.rectangle(
        (x1 + x2) / 2,
        (y1 + y2) / 2,
        Math.abs(x2 - x1) || SEGMENT_THICKNESS,
        Math.abs(y2 - y1) || SEGMENT_THICKNESS,
        {
            isStatic: true,
            render: { fillStyle: color },
        }
    );
    World.add(world, segment);
}

function createPeg(x, y, color) {
    const peg = Bodies.circle(x, y, 10, {
        isStatic: true,
        restitution: 0.1,
        friction: 0.5,
        render: { fillStyle: color },
    });
    World.add(world, peg);
}

// Добавляем элементы в мир
const step = 60;
let pegY = HEIGHT / 2 - 200;
for (let i = 0; i < 10; i++) {
    let pegX = i % 2 === 0 ? -step : -1.5 * step;
    while (pegX < WIDTH) {
        createPeg(pegX, pegY, 'darkslateblue');
        if (i === 9) {
            createSegment(pegX, pegY + 50, pegX, HEIGHT, 'darkslategray');
        }
        pegX += step;
    }
    pegY += step * 0.5;
}
