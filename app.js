// Event listener for Metric btn
document.getElementById('metric').addEventListener('click', selectMetric);

// Select metric btn, unselect imperial btn, and change the 3 labels
function selectMetric(e) {
  // Change button styles to select metric
  document.getElementById('metric').className = 'button-primary';
  document.getElementById('imperial').className = '';

  // Change each label to metric unit
  document.getElementById('speed-label').innerText = 'km/hr';
  document.getElementById('temp-label').innerText = 'C°';
  document.getElementById('results-label').innerText = 'C°';

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
  document.getElementById('temp-label').innerText = 'F°';
  document.getElementById('results-label').innerText = 'F°';

  e.preventDefault();
}

// Creates div to alert user that input is missing
const errorMessage = function () {
  // Create div
  const div = document.createElement('div');
  // Add class
  div.className = 'alert';
  // Add text
  div.appendChild(document.createTextNode('Wind speed & temperature needed'));
  // Get parent
  const container = document.querySelector('.container');
  const form = document.getElementById('form');
  // Insert alert
  container.insertBefore(div, form);
  // Clear input entries
  document.getElementById('wind-speed').value = '';
  document.getElementById('temp').value = '';
  // Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Event listener for calculate btn
document.getElementById('calculate').addEventListener('click', calculate);

function calculate(e) {
  // Result var
  let result;
  // Wind speed and temp vars
  let wind = document.getElementById('wind-speed');
  let temp = document.getElementById('temp');
  // Metric and imperial vars
  let metric = document.getElementById('metric');
  let imperial = document.getElementById('imperial');
  // Check if wind speed and temp were entered
  if (wind.value === '' || temp.value === '') {
    return errorMessage();
  } else {
    // Convert wind and temperature vars to numbers
    wind = Number(wind.value);
    temp = Number(temp.value);
  }
  // Check if metric or imperial selected and calculate wind chill result
  if (metric.className === 'button-primary') {
    result = 13.12 + (0.6215 * temp) - (11.37 * (Math.pow(wind, 0.16))) + (0.3965 * ((temp) * (Math.pow(wind, 0.16))));
  } else {
    result = 35.74 + (0.6215 * temp) - (35.75 * (Math.pow(wind, 0.16))) + (0.4275 * ((temp) * (Math.pow(wind, 0.16))));
  }
  // Display result
  document.getElementById('results').value = Math.round(result);

  e.preventDefault();
}