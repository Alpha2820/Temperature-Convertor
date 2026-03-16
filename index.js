const modeSelect = document.getElementById('mode');
const tempInput = document.getElementById('temperature');
const resultEl = document.getElementById('result');
const historyList = document.getElementById('historyList');
const convertBtn = document.getElementById('convertBtn');
const resetBtn = document.getElementById('resetBtn');

const history = [];
const maxHistory = 6;

const converters = {
  cToF: {
    label: 'Celsius → Fahrenheit',
    inputUnit: '°C',
    outputUnit: '°F',
    convert: (v) => v * 9 / 5 + 32,
  },
  fToC: {
    label: 'Fahrenheit → Celsius',
    inputUnit: '°F',
    outputUnit: '°C',
    convert: (v) => (v - 32) * 5 / 9,
  },
  cToK: {
    label: 'Celsius → Kelvin',
    inputUnit: '°C',
    outputUnit: 'K',
    convert: (v) => v + 273.15,
  },
  kToC: {
    label: 'Kelvin → Celsius',
    inputUnit: 'K',
    outputUnit: '°C',
    convert: (v) => v - 273.15,
  },
  fToK: {
    label: 'Fahrenheit → Kelvin',
    inputUnit: '°F',
    outputUnit: 'K',
    convert: (v) => (v - 32) * 5 / 9 + 273.15,
  },
  kToF: {
    label: 'Kelvin → Fahrenheit',
    inputUnit: 'K',
    outputUnit: '°F',
    convert: (v) => (v - 273.15) * 9 / 5 + 32,
  },
};

function updateResult(message, isError = false) {
  resultEl.textContent = message;
  resultEl.style.color = isError ? '#c0392b' : 'inherit';
}

function addHistory(entry) {
  history.unshift(entry);
  if (history.length > maxHistory) history.pop();
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  if (!history.length) {
    const li = document.createElement('li');
    li.textContent = 'No conversions yet.';
    historyList.appendChild(li);
    return;
  }

  history.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function convertTemperature() {
  const mode = modeSelect.value;
  const converter = converters[mode];
  const value = parseFloat(tempInput.value);

  if (Number.isNaN(value)) {
    updateResult('Please enter a valid number.', true);
    return;
  }

  const resultValue = converter.convert(value);
  const formatted = `${value.toFixed(2)}${converter.inputUnit} → ${resultValue.toFixed(2)}${converter.outputUnit}`;
  updateResult(formatted);
  addHistory(formatted);
}

function resetAll() {
  tempInput.value = '';
  updateResult('Enter a value and press Convert.');
  history.length = 0;
  renderHistory();
}

convertBtn.addEventListener('click', convertTemperature);
resetBtn.addEventListener('click', resetAll);

// Allow pressing Enter to convert
tempInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    convertTemperature();
  }
});

renderHistory();
