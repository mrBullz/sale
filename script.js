const quiz = document.querySelector("[data-quiz]");

if (quiz) {
  const answers = [];
  const steps = Array.from(quiz.querySelectorAll(".quiz-step"));
  const result = quiz.querySelector(".quiz-result");
  const packageChannels = ["ВК", "MAX", "Telegram"];

  const getMissingChannels = (currentChannel) => {
    if (currentChannel === "Пока нет каналов" || currentChannel === "SMS или email") {
      return packageChannels;
    }

    return packageChannels.filter((channel) => channel !== currentChannel);
  };

  const getLaunchPlan = (currentChannel, baseSize, goal) => {
    const missingChannels = getMissingChannels(currentChannel);
    const hasMessenger = packageChannels.includes(currentChannel);
    const currentText = hasMessenger ? `оставить ${currentChannel} как базовый канал` : "начать с чистой настройки каналов";

    const complexityByBase = {
      "до 5 000 клиентов": "быстрый запуск: достаточно одного сегмента и 1-2 сценариев",
      "5 000–20 000 клиентов": "средний запуск: стоит разделить базу на новые, активные и неактивные сегменты",
      "20 000–100 000 клиентов": "расширенный запуск: лучше запускать каналы по сегментам и сравнивать отклик",
      "100 000+ клиентов": "корпоративный запуск: нужен поэтапный rollout, контроль частоты и отдельная аналитика по каналам"
    };

    const scenarioByGoal = {
      "вернуть клиентов": "реактивация неактивных клиентов",
      "увеличить повторные покупки": "сценарий повторной покупки после первого заказа",
      "запустить персональные предложения": "персональные предложения по сегментам",
      "сравнить эффективность каналов": "A/B-сравнение отклика во ВК, MAX и Telegram"
    };

    const firstChannelByGoal = {
      "вернуть клиентов": "Telegram для быстрых напоминаний и MAX для сценария в боте",
      "увеличить повторные покупки": "MAX для клиентского сценария и ВК для широкого охвата",
      "запустить персональные предложения": "ВК для сегментных коммуникаций и MAX для карты/предложений",
      "сравнить эффективность каналов": "одинаковый сценарий сразу во ВК, MAX и Telegram"
    };

    return {
      missingText: missingChannels.length ? missingChannels.join(" + ") : "объединить текущие каналы в пакет",
      currentText,
      complexity: complexityByBase[baseSize],
      scenario: scenarioByGoal[goal],
      firstChannel: firstChannelByGoal[goal]
    };
  };

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
        const plan = getLaunchPlan(answers[0], answers[1], answers[2]);

        result.innerHTML = `
          <div class="quiz-result-card">
            <span class="result-label">Ваш план запуска</span>
            <strong>${plan.scenario}</strong>
            <div class="result-grid">
              <div><span>Текущая база</span><b>${answers[1]}</b></div>
              <div><span>Что добавить</span><b>${plan.missingText}</b></div>
              <div><span>Первый фокус</span><b>${plan.firstChannel}</b></div>
              <div><span>Формат запуска</span><b>${plan.complexity}</b></div>
            </div>
            <p>Рекомендация: ${plan.currentText}, подключить пакет ВК + MAX + Telegram со скидкой 30% и сравнить отклик каналов на одном сценарии.</p>
          </div>
        `;
      }
    }, 180);
  });
}
