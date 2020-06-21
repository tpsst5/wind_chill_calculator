// Event listener for Metric btn
document.getElementById('metric').addEventListener('click', selectMetric);

// Select metric btn, unselect imperial btn, and change the 3 labels
function selectMetric(e) {
  // Change button styles to select metric
  document.getElementById('metric').className = 'button-primary';
  document.getElementById('imperial').className = '';

  // Change each label to metric unit
  document.getElementById('speed-label').innerText = 'km/hr';
  document.getElementById('temp-label').innerText = '°C';
  document.getElementById('results-label').innerText = '°C';

  e.preventDefault();
}

// Event listener for Imperial btn
document.getElementById('imperial').addEventListener('click', selectImperial);

// Select imperial btn, unselect metric btn, and change the 3 labels
function selectImperial(e) {
  // Change button styles to select imperial
  document.getElementById('imperial').className = 'button-primary';
  document.getElementById('metric').className = '';

  // Change each label to imperial unit
  document.getElementById('speed-label').innerText = 'mph';
  document.getElementById('temp-label').innerText = '°F';
  document.getElementById('results-label').innerText = '°F';

  e.preventDefault();
}

// Event listener for zip code submission
document.getElementById('zip-btn').addEventListener('click', submitZip);

// Retrieve weather data from zip code submission
function submitZip(e) {
  // Zip code input
  const zipCode = document.getElementById('zip-input').value;
  // Check if zip code is valid
  if (zipCode.length !== 5) {
    let error = 'zip';
    return errorMessage(error);
  }
  // API URL
  const apiURL = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=5b4e1bf95349458eb77223608202006&q=${zipCode}&format=json`;
  // data
  let zipData
  // Input vars
  let wind, temp;

  // Fetch API data by searching zip code
  async function getData(apiURL) {
    const response = await fetch(apiURL);

    return response.json()
  }

  // Assign JSON API data to zipData var
  async function main() {
    let zipData = await getData(apiURL);
    zipData = zipData.data.current_condition[0];
    // Check if metric or imperial and assign wind and temp vars
    if (document.getElementById('metric').className === 'button-primary') {
      wind = zipData.windspeedKmph;
      temp = zipData.temp_C;
    } else {
      wind = zipData.windspeedMiles;
      temp = zipData.temp_F;
    }
    // Display live inputs
    document.getElementById('wind-speed').value = wind;
    document.getElementById('temp').value = temp;
    // Disable all inputs
    document.getElementById('zip-input').disabled = true;
    document.getElementById('wind-speed').disabled = true;
    document.getElementById('temp').disabled = true;
  }
  // Call main function and display live temp and wind values
  main();

  e.preventDefault();
}

// Creates div to alert user that input is missing
const errorMessage = function (units) {
  // Create div
  const div = document.createElement('div');
  // Add class
  div.className = 'alert';
  // Check the error and add the text alert
  if (units === 'metric') {
    div.appendChild(document.createTextNode('Temperature needs to be 10°C or below and wind speed greater than 4.8 km/hr'));
  } else if (units === 'imperial') {
    div.appendChild(document.createTextNode('Temperature needs to be 50°F or below and wind speed greater than 3 mph'));
  } else if (units === 'zip') {
    div.appendChild(document.createTextNode('Invalid zip code'));
  } else {
    div.appendChild(document.createTextNode('Wind speed & temperature needed'));
  }
  // Get parent
  const container = document.querySelector('.container');
  const form = document.getElementById('form');
  // Insert alert
  container.insertBefore(div, form);
  // Clear input entries
  document.getElementById('zip-input').value = '';
  document.getElementById('wind-speed').value = '';
  document.getElementById('temp').value = '';
  // Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3500);
}

// Event listener for calculate btn
document.getElementById('calculate').addEventListener('click', calculate);

function calculate(e) {
  // Result var
  let result;
  // Units var: Either meteric or imperial
  let units;
  // Wind speed and temp vars
  let wind = document.getElementById('wind-speed').value;
  let temp = document.getElementById('temp').value;
  // Check if metric or imperial selected
  metric.className === 'button-primary' ? units = 'metric' : units = 'imperial';
  // Check if wind speed and temp were entered
  if (!wind || !temp) {
    console.log(wind, temp); // BLANK ENTRY === 0 
    return errorMessage();
  }
  // Convert wind and temperature vars to numbers
  wind = Number(wind);
  temp = Number(temp);
  // Check if temp is low enough & wind is high enough to calculate wind chill
  if (units === 'metric') {
    if (temp > 10 || wind < 4.8) {
      return errorMessage(units);
    }
  } else {
    if (temp > 50 || wind < 3) {
      return errorMessage(units);
    }
  }

  // Check if metric or imperial selected and calculate wind chill result
  if (units === 'metric') {
    result = 13.12 + (0.6215 * temp) - (11.37 * (Math.pow(wind, 0.16))) + (0.3965 * ((temp) * (Math.pow(wind, 0.16))));
  } else {
    result = 35.74 + (0.6215 * temp) - (35.75 * (Math.pow(wind, 0.16))) + (0.4275 * ((temp) * (Math.pow(wind, 0.16))));
  }
  // Display result
  document.getElementById('results').value = Math.round(result);
  // Disable inputs
  document.getElementById('zip-input').disabled = true;
  document.getElementById('wind-speed').disabled = true;
  document.getElementById('temp').disabled = true;

  e.preventDefault();
}