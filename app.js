'use strict';

// Weather App

const form = document.querySelector('form');

const apiKey = '742d340226f94c6ad754526df79b475f';
const findedCities = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // event.target.value - target -> input

  const input = document.querySelector('input');
  const inputValue = input.value;
  const errMsg = document.querySelector('.msg');

  if (findedCities.includes(inputValue.toLowerCase())) {
    errMsg.textContent = `You already know the weather for ${inputValue}`
    form.reset();
    input.focus();
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const { main, sys, weather, name } = data; 

        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
        const citiesList = document.querySelector('.cities');

        const li = document.createElement('li');
        li.classList.add('city');
  
        const markup = `
          <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
          </h2>
          <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
          <figure>
            <img class="city-icon" src="${icon}" alt="${
              weather[0]["description"]
            }">
            <figcaption>${weather[0]["description"]}</figcaption>
          </figure>
        `;
  
        li.innerHTML = markup;
        citiesList.appendChild(li);
        findedCities.push(inputValue.toLowerCase())
      } else {
        throw new Error(data.message)
      }

    })
    .catch((e) => {
      errMsg.textContent = e.message;
    })

    form.reset();
    input.focus();
    errMsg.textContent = '';
})