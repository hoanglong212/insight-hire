<template>
  <div class="card border-0 shadow-sm section-card">
    <div class="card-body p-3 p-lg-4">
      <form class="row g-2 align-items-start mb-4" @submit.prevent="addTask">
        <div class="col-lg-9">
          <label for="newTask" class="form-label visually-hidden">New task</label>
          <input
            id="newTask"
            v-model.trim="newTask"
            type="text"
            class="form-control"
            placeholder="Enter a new task"
          />
          <p v-if="taskError" class="text-danger small mt-2 mb-0">{{ taskError }}</p>
        </div>
        <div class="col-lg-3 d-grid">
          <button class="btn btn-primary" type="submit">Add</button>
        </div>
      </form>

      <div v-if="tasks.length" class="table-responsive">
        <table class="table align-middle todo-table mb-0">
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col" class="text-nowrap">Priority</th>
              <th scope="col" class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <td>
                <span class="fw-semibold">{{ task.text }}</span>
                <span :class="priorityClass(task.priority)" class="ms-2">
                  ({{ task.priority }} Priority)
                </span>
              </td>
              <td>
                <span :class="priorityBadgeClass(task.priority)">{{ task.priority }}</span>
              </td>
              <td class="text-end">
                <div class="btn-group btn-group-sm" role="group" aria-label="Task actions">
                  <button class="btn btn-outline-primary" type="button" @click="togglePriority(task.id)">
                    {{ task.priority === 'High' ? 'Mark as Low Priority' : 'Mark as High Priority' }}
                  </button>
                  <button class="btn btn-outline-danger" type="button" @click="deleteTask(task.id)">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="empty-state text-center py-5">
        <h3 class="h5 fw-bold">No tasks yet</h3>
        <p class="text-secondary mb-0">Add your first job-search task above.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newTask = ref('')
const taskError = ref('')
const tasks = ref([
  { id: 1, text: 'Prepare for the interview', priority: 'High' },
  { id: 2, text: 'Submit job application form', priority: 'Low' }
])

function addTask() {
  if (!newTask.value) {
    taskError.value = 'Please enter a task before adding it.'
    return
  }

  tasks.value.unshift({
    id: Date.now(),
    text: newTask.value,
    priority: 'Low'
  })

  newTask.value = ''
  taskError.value = ''
}

function deleteTask(taskId) {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)
}

function togglePriority(taskId) {
  const task = tasks.value.find((item) => item.id === taskId)
  if (task) {
    task.priority = task.priority === 'High' ? 'Low' : 'High'
  }
}

function priorityClass(priority) {
  return priority === 'High' ? 'text-danger fw-semibold' : 'text-secondary'
}

function priorityBadgeClass(priority) {
  return priority === 'High' ? 'badge text-bg-danger' : 'badge text-bg-secondary'
}
</script>
