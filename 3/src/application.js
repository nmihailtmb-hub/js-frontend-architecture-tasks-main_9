export default (laptops) => {
  const form = document.querySelector('form');
  const resultDiv = document.querySelector('.result');
  
  const getFilterValue = (name) => {
    const input = form.querySelector(`[name="${name}"]`);
    return input ? input.value : '';
  };
  
  const render = () => {
    const processorFilter = getFilterValue('processor').toLowerCase();
    const memoryFilter = getFilterValue('memory');
    const frequencyFilter = getFilterValue('frequency');
    
    const filtered = laptops.filter(laptop => {
      // Фильтр по процессору
      if (processorFilter && !laptop.processor.toLowerCase().includes(processorFilter)) {
        return false;
      }
      
      // Фильтр по памяти
      if (memoryFilter && laptop.memory !== parseInt(memoryFilter, 10)) {
        return false;
      }
      
      // Фильтр по частоте
      if (frequencyFilter && laptop.frequency < parseFloat(frequencyFilter)) {
        return false;
      }
      
      return true;
    });
    
    if (filtered.length === 0) {
      resultDiv.innerHTML = '';
    } else {
      resultDiv.innerHTML = `<ul>${filtered.map(l => `<li>${l.model}</li>`).join('')}</ul>`;
    }
  };
  
  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(input => {
    const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
    input.addEventListener(eventType, render);
  });
  
  render();
};