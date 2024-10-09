$(document).ready(function () {
  let punkty = 0;
  let currentQuestionnr = 0;
  let Timer;
  let timeLeft = 15;
  let currentAnswer = "";

  const questions = [
    { question: "Pytanie1", answer: "no" },
    { question: "Pytanie2", answer: "yes" },
    { question: "Pytanie3", answer: "yes" },
    { question: "Pytanie4", answer: "yes" },
    { question: "Pytanie5", answer: "yes" },
  ];

  function startTimer() {
    timeLeft = 15;
    updateTimer();

    Timer = setInterval(() => {
      if (--timeLeft <= 0) {
        clearInterval(Timer);
        endGame("no");
      } else {
        updateTimer();
      }
    }, 1000);
  }

  function updateTimer() {
    $("#time-bar-question").text(`${timeLeft} sek`);
  }

  function Game() {
    $(".container").animate({ top: "50%" }, 500);
    if (currentQuestionnr < questions.length) {
      const { question, answer } = questions[currentQuestionnr];
      $(".question").first().text(question);
      currentAnswer = answer;
    } else {
      clearInterval(Timer);
      endGame(punkty === 5 ? "yes" : "no");
    }
  }

  function checkAnswer(Answer) {
    punkty += Answer === currentAnswer ? 1 : 0;
    currentQuestionnr++;
    Game();
  }

  $("#answer1").on("click", () => checkAnswer("yes"));
  $("#answer2").on("click", () => checkAnswer("no"));

  function endGame(result) {
    $("#answer1, #answer2, #time-bar-question, .question, #text-main").hide();
    $("#end-game").text(result === "yes" ? "Wygrales" : "Przegrales");

    setTimeout(() => {
      $(".container").animate({ top: "-20%" }, 500);
      $.post(
        `https://${GetParentResourceName()}/${
          result === "yes" ? "udane" : "nieudane"
        }`
      );
    }, 5000);
  }

  window.addEventListener("message", (event) => {
    if (event.data.action === "startGame") {
      Game();
      startTimer();
    }
  });
});
