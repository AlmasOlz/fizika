const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const { size } = config.canvas;

canvas.width = size.width;
canvas.height = size.height;

const center = { x: size.width / 2, y: size.height / 2 };

// Массив сегментов
const slices = Array(config.disc.slices)
  .fill()
  .map((_, i) => {
    const { PI } = Math;
    const { slices, radius, color } = config.disc;
    const { saturation, lightness } = color;
    return new Slice(
      center.x,
      center.y,
      radius,
      i * ((2 * PI) / slices),
      (i + 1) * ((2 * PI) / slices),
      hslStringify((i * 360) / slices, saturation, lightness)
    );
  });

let rotateAngle = 0;
let rotateAngleChangeAcceleration = 0;
let isRotating = false; // Переменная для отслеживания, вращается ли диск

// Логика анимации
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, size.width, size.height);

  // Отрисовка фона
  ctx.fillStyle = config.canvas.background;
  ctx.fillRect(0, 0, size.width, size.height);

  // Отрисовка секторов
  slices.forEach(slice => slice.draw(ctx, rotateAngle));

  // Управление скоростью вращения
  if (isRotating) {
    rotateAngle += rotateAngleChangeAcceleration;
    rotateAngleChangeAcceleration += 0.0001; // Ускорение вращения
  }
};

// Запуск анимации
animate();

// Обработчик для кнопки старта
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  isRotating = !isRotating; // Переключаем состояние вращения
  startButton.textContent = isRotating ? "Stop" : "Start"; // Меняем текст кнопки
});

// Обработчик для ползунка скорости
const speedControl = document.getElementById("speedControl");
speedControl.addEventListener("input", (e) => {
  rotateAngleChangeAcceleration = parseFloat(e.target.value) * 0.01; // Изменяем скорость вращения
});
