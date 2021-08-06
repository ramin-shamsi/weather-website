const form = document.querySelector("form");
const input = document.querySelector("input");
const msg1 = document.querySelector("#location");
const msg2 = document.querySelector("#temperature");
const msg3 = document.querySelector("#description");
const msg4 = document.querySelector("#wind_speed");
const msg5 = document.querySelector("#wind_degree");
const msg6 = document.querySelector("#wind_dir");
const msg7 = document.querySelector("#pressure");
const msg8 = document.querySelector("#precip");
const msg9 = document.querySelector("#humidity");
const msg10 = document.querySelector("#cloudcover");
const msg11 = document.querySelector("#feelslike");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = input.value;

  // Clear paragraphs textContent
  msg1.textContent = "Loading...";
  msg2.textContent = "";
  msg3.textContent = "";
  msg4.textContent = "";
  msg5.textContent = "";
  msg6.textContent = "";
  msg7.textContent = "";
  msg8.textContent = "";
  msg9.textContent = "";
  msg10.textContent = "";
  msg11.textContent = "";

  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = `Location: ${data.location}`;
        msg2.textContent = `Temperature: ${data.temperature}`;
        msg3.textContent = `Description: ${data.description}`;
        msg4.textContent = `Wind Speed: ${data.wind_speed}`;
        msg5.textContent = `Wind Degree: ${data.wind_degree}`;
        msg6.textContent = `Wind Direction: ${data.wind_dir}`;
        msg7.textContent = `Pressure: ${data.pressure}`;
        msg8.textContent = `Precip: ${data.precip}`;
        msg9.textContent = `Humidity: ${data.humidity}%`;
        msg10.textContent = `Cloud Cover: ${data.cloudcover}`;
        msg11.textContent = `Feels Like: ${data.feelslike}`;
      }
    });
  });
});
