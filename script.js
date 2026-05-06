const quiz = document.querySelector("[data-quiz]");

if (quiz) {
  const answers = [];
  const steps = Array.from(quiz.querySelectorAll(".quiz-step"));
  const result = quiz.querySelector(".quiz-result");

  quiz.addEventListener("click", (event) => {
    const button = event.target.closest("[data-answer]");
    if (!button) return;

    const current = Number(button.closest(".quiz-step").dataset.step);
    answers[current] = button.dataset.answer;

    button.parentElement.querySelectorAll("button").forEach((item) => {
      item.classList.toggle("selected", item === button);
    });

    setTimeout(() => {
      steps[current].classList.remove("active");
      steps[current + 1].classList.add("active");

      if (current + 1 === 3) {
        result.textContent = `Задача: ${answers[0]}. Аудитория: ${answers[1]}. Первый сценарий: ${answers[2]}. На консультации соберём план запуска, метрики и сегмент для теста.`;
      }
    }, 180);
  });
}
