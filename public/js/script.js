(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

const r = document.getElementById("rspan");

const words = ["Focused", "Organized", "Ahead"];
let i = 0;



function repeatWords() {
  r.classList.add("fade-out");

  setTimeout(() => {
    r.innerHTML = words[i];
    i = (i + 1) % words.length;
    r.classList.remove("fade-out");
  }, 500);

  setTimeout(repeatWords, 3000); 
}

repeatWords();

