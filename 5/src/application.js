import uniqueId from 'lodash/uniqueId.js';

export default () => {
  const state = {
    lists: [{ id: 'general', name: 'General', tasks: [] }],
    activeListId: 'general'
  };
  
  const listsContainer = document.querySelector('[data-container="lists"]');
  const tasksContainer = document.querySelector('[data-container="tasks"]');
  const newListForm = document.querySelector('[data-container="new-list-form"]');
  const newTaskForm = document.querySelector('[data-container="new-task-form"]');
  
  const render = () => {
    const activeList = state.lists.find(l => l.id === state.activeListId);
    
    if (listsContainer) {
      const ul = document.createElement('ul');
      state.lists.forEach(list => {
        const li = document.createElement('li');
        if (list.id === state.activeListId) {
          li.innerHTML = `<b>${list.name}</b>`;
        } else {
          const a = document.createElement('a');
          a.href = `#${list.id}`;
          a.textContent = list.name;
          a.dataset.listId = list.id;
          li.appendChild(a);
        }
        ul.appendChild(li);
      });
      listsContainer.innerHTML = '';
      listsContainer.appendChild(ul);
    }
    
    if (tasksContainer) {
      if (activeList && activeList.tasks.length) {
        const ul = document.createElement('ul');
        activeList.tasks.forEach(task => {
          const li = document.createElement('li');
          li.textContent = task;
          ul.appendChild(li);
        });
        tasksContainer.innerHTML = '';
        tasksContainer.appendChild(ul);
      } else {
        tasksContainer.innerHTML = '';
      }
    }
  };
  
  if (listsContainer) {
    listsContainer.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.dataset.listId) {
        e.preventDefault();
        state.activeListId = target.dataset.listId;
        render();
      }
    });
  }
  
  if (newListForm) {
    newListForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newListForm.querySelector('input');
      const name = input.value.trim();
      if (name && !state.lists.some(l => l.name === name)) {
        state.lists.push({ id: uniqueId(), name, tasks: [] });
        input.value = '';
        render();
      }
    });
  }
  
  if (newTaskForm) {
    newTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newTaskForm.querySelector('input');
      const taskName = input.value.trim();
      if (taskName) {
        const activeList = state.lists.find(l => l.id === state.activeListId);
        if (activeList) {
          activeList.tasks.unshift(taskName);
          input.value = '';
          render();
        }
      }
    });
  }
  
  render();
};