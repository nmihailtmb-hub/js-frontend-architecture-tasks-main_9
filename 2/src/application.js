import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

export default async () => {
  const form = document.querySelector('form');
  const input = form.querySelector('[name="name"]');
  const tasksList = document.getElementById('tasks');
  
  const loadTasks = async () => {
    const { data } = await axios.get(routes.tasksPath());
    tasksList.innerHTML = data.items.map(task => `<li class="list-group-item">${task.name}</li>`).join('');
  };
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (name) {
      await axios.post(routes.tasksPath(), { name });
      input.value = '';
      await loadTasks();
    }
  });
  
  await loadTasks();
};