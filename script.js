const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const filters = document.querySelectorAll(".filter");
const requestCards = document.querySelectorAll(".request-card");
const publicRequestForm = document.querySelector("#public-request-form");
const formStatus = document.querySelector("#form-status");
const loginDialog = document.querySelector("#login-dialog");
const loginStatus = document.querySelector("#login-status");
const demoLoginForm = document.querySelector("#demo-login-form");
const aiToggle = document.querySelector(".ai-toggle");
const aiPanel = document.querySelector("#ai-panel");
const aiClose = document.querySelector(".ai-close");
const aiForm = document.querySelector("#ai-form");
const aiMessages = document.querySelector("#ai-messages");

year.textContent = new Date().getFullYear();

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Menyuni yopish" : "Menyuni ochish",
  );
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    const value = filter.dataset.filter;

    requestCards.forEach((card) => {
      const matches =
        value === "all" ||
        (value === "urgent" && card.dataset.urgent === "true") ||
        card.dataset.type === value;
      card.classList.toggle("hidden", !matches);
    });
  });
});

publicRequestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(publicRequestForm);
  formStatus.textContent =
    `${data.get("region")} hududi uchun ${data.get("bloodType")} guruhli ${data.get("urgency").toLowerCase()} demo e'loni tayyorlandi.`;
  publicRequestForm.reset();
});

document.querySelector("[data-open-login]").addEventListener("click", () => {
  loginDialog.showModal();
});

document.querySelector("[data-close-login]").addEventListener("click", () => {
  loginDialog.close();
});

demoLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginStatus.textContent =
    "Bu demo. Hisob yaratish uchun xavfsiz backend va autentifikatsiya kerak.";
});

aiToggle.addEventListener("click", () => {
  const isOpen = aiPanel.hidden;
  aiPanel.hidden = !isOpen;
  aiToggle.setAttribute("aria-expanded", String(isOpen));
});

aiClose.addEventListener("click", () => {
  aiPanel.hidden = true;
  aiToggle.setAttribute("aria-expanded", "false");
});

aiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(aiForm);
  const query = data.get("query").trim();
  const userMessage = document.createElement("p");
  userMessage.className = "ai-message ai-user";
  userMessage.textContent = query;
  aiMessages.append(userMessage);

  const normalized = query.toLowerCase();
  let answer =
    "Bu ma'lumot sahifada topilmadi. “Qon guruhlari”, “topshirish jarayoni” yoki “tez-tez so‘raladigan savollar” deb qidiring.";

  if (normalized.includes("qon guruhi") || normalized.includes("guruh")) {
    answer =
      "Saytda A+, B+, O+ va AB+ namuna ehtiyojlari ko'rsatilgan. Real yaroqlilikni faqat qon xizmati mutaxassisi aniqlaydi.";
  } else if (normalized.includes("qanday") || normalized.includes("jarayon") || normalized.includes("topshir")) {
    answer =
      "Qon topshirish jarayonini “Qanday ishlaydi” bo‘limidan ko'rishingiz mumkin: ma'lumotni tekshiring, markaz bilan bog'laning va mutaxassis ko'rsatmasi bilan topshirin.";
  } else if (normalized.includes("savol") || normalized.includes("faq") || normalized.includes("yaroq")) {
    answer =
      "Tez-tez so‘raladigan savollar bo‘limida yaroqlilik, real ro‘yxatdan o‘tish va ma'lumot manbalari haqida javoblar mavjud.";
  } else if (normalized.includes("demo") || normalized.includes("e'lon")) {
    answer =
      "Ehtiyoj kartalari demo namunalardir. Real shaxsiy ma'lumot yoki sog‘liq ma'lumotlari yig'ilmaydi.";
  }

  const botMessage = document.createElement("p");
  botMessage.className = "ai-message ai-bot";
  botMessage.textContent = answer;
  aiMessages.append(botMessage);
  aiMessages.scrollTop = aiMessages.scrollHeight;
  aiForm.reset();
});
