const form = document.querySelector("form");
const input = document.querySelector("input");
const msgOne = document.querySelector("#location");
const msgTwo = document.querySelector("#temperature");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = input.value;

  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = `Your Location is ${data.location}`;
        msgTwo.textContent = `Temperature is ${data.temperature}`;
      }
    });
  });
});
