import emailjs from "@emailjs/browser";

const form = document.getElementById("form");

if (form && !form.dataset.emailjsInitialized) {
  form.dataset.emailjsInitialized = "true";

  const btn = document.getElementById("button");
  const emailjsPublicKey = form.dataset.emailjsPublicKey;
  const emailjsServiceId = form.dataset.emailjsServiceId;
  const emailjsTemplateId = form.dataset.emailjsTemplateId;

  emailjs.init(emailjsPublicKey);

  btn.addEventListener("click", function (event) {
    event.preventDefault();
    btn.textContent = "Enviando...";

    const msg = document.getElementById("form-message");
    msg.className = "form-message";

    emailjs.sendForm(emailjsServiceId, emailjsTemplateId, form).then(
      () => {
        btn.textContent = "Enviar mensaje";
        msg.textContent = "Mensaje enviado con éxito";
        msg.classList.add("success");
        form.reset();
      },
      () => {
        btn.textContent = "Enviar mensaje";
        msg.textContent = "Error al enviar. Intenta de nuevo.";
        msg.classList.add("error");
      },
    );
  });

  window.addEventListener("load", () => form.reset(), { once: true });

  const fileInput = document.getElementById("archivo");
  fileInput.addEventListener("change", () => {
    const fileName = fileInput.files?.[0]?.name;
    const fileNameElement = document.getElementById("nombreArchivo");
    if (fileNameElement) fileNameElement.textContent = fileName || "Selecciona tu archivo";
  });

  const focusElements = document.querySelectorAll(
    ".activeFocusInput, .activeFocusAnchor",
  );
  const formLabels = document.querySelectorAll(".activeFocusLabel");

  if (focusElements.length === formLabels.length) {
    focusElements.forEach((element, index) => {
      const label = formLabels[index];
      element.addEventListener("focus", () => label.classList.add("active"));
      element.addEventListener("blur", () => {
        if (!element.value) label.classList.remove("active");
      });
    });
  }

  const toggleArrows = document.querySelectorAll(
    ".form-dropdown__toggle-arrow, .w-toggle-arrow",
  );
  const selectElement = document.getElementById("service_type");
  const labelElement = document.getElementById("service_type_label");

  toggleArrows.forEach((toggleArrow) => {
    toggleArrow.addEventListener("click", () => {
      selectElement.classList.toggle("hidden");
      selectElement.classList.toggle("select-visible");
      selectElement.size = selectElement.classList.contains("select-visible")
        ? selectElement.options.length
        : 1;
      toggleArrow.classList.toggle("w--open");
    });
  });

  selectElement.addEventListener("change", () => {
    labelElement.textContent = selectElement.options[selectElement.selectedIndex].text;
    labelElement.classList.add("selected-option");
    selectElement.classList.add("hidden");
    selectElement.classList.remove("select-visible");
    selectElement.size = 1;
    toggleArrows.forEach((toggleArrow) => toggleArrow.classList.remove("w--open"));
  });

  const message = document.getElementById("message");
  const charCount = document.getElementById("wordCount");

  message.addEventListener("input", () => {
    const maxChars = 350;
    if (message.value.length > maxChars) message.value = message.value.substring(0, maxChars);
    charCount.textContent = `${message.value.length} / ${maxChars} caracteres`;
  });
}
