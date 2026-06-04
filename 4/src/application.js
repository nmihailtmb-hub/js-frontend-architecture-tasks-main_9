export default (companies) => {
  const container = document.querySelector('.container');
  container.innerHTML = '';
  let activeIndex = null;
  let descriptionDiv = null;
  
  companies.forEach((company, index) => {
    const btn = document.createElement('button');
    btn.textContent = company.name;
    btn.className = 'btn btn-primary m-1';
    
    btn.addEventListener('click', () => {
      if (activeIndex === index) {
        if (descriptionDiv) descriptionDiv.remove();
        activeIndex = null;
        descriptionDiv = null;
      } else {
        if (descriptionDiv) descriptionDiv.remove();
        descriptionDiv = document.createElement('div');
        descriptionDiv.textContent = company.description;
        container.appendChild(descriptionDiv);
        activeIndex = index;
      }
    });
    
    container.appendChild(btn);
  });
};