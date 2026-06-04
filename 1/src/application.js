export default () => {
  const form = document.querySelector('form');
  const input = form.querySelector('input');
  const sumDiv = document.createElement('div');
  let sum = 0;
  
  const update = () => {
    sumDiv.textContent = `Sum: ${sum}`;
    const resultDiv = document.getElementById('result');
    if (resultDiv) resultDiv.textContent = sum;
  };
  
  form.parentNode.insertBefore(sumDiv, form.nextSibling);
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = parseInt(input.value, 10);
    if (!isNaN(val)) sum += val;
    update();
    form.reset();
    input.focus();
  });
  
  const resetBtn = form.querySelector('button[type="button"]');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      sum = 0;
      update();
      form.reset();
      input.focus();
    });
  }
  
  update();
  input.focus();
};