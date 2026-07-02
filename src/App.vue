<template>
  <div class="app-shell">
    <header class="site-header shadow-sm sticky-top">
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
          <a class="navbar-brand fw-bold text-primary" href="#" @click.prevent="scrollToSection('top')">
            Insight Hire
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="mainNav" class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto gap-lg-2">
              <li class="nav-item">
                <button class="nav-link btn btn-link" type="button" @click="scrollToSection('job-explorer')">
                  Job Explorer
                </button>
              </li>
              <li class="nav-item">
                <button class="nav-link btn btn-link" type="button" @click="scrollToSection('job-application')">
                  Job Application
                </button>
              </li>
              <li class="nav-item">
                <button class="nav-link btn btn-link" type="button" @click="scrollToSection('todo-list')">
                  To-Do List
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main id="top">
      <section class="hero-section text-white">
        <div class="container py-5">
          <div class="row align-items-center g-4">
            <div class="col-lg-7">
              <p class="text-uppercase fw-semibold mb-2 hero-kicker">COS30043 Assignment 2</p>
              <h1 class="display-5 fw-bold mb-3">Find your next technology opportunity</h1>
              <p class="lead mb-0">
                Browse curated jobs, submit a validated application form, and manage your job-search tasks in one Vue app.
              </p>
            </div>
            <div class="col-lg-5">
              <div class="hero-card bg-white text-dark shadow-lg">
                <h2 class="h5 fw-bold mb-3">Insight Hire</h2>
                <p class="mb-3 text-secondary">
                  Built with Vue 3 components, Vue Router, Bootstrap, and separated project files.
                </p>
                <button class="btn btn-primary" type="button" @click="scrollToSection('job-explorer')">
                  Explore Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="job-explorer" class="section-block">
        <div class="container">
          <div class="section-heading">
            <span class="badge text-bg-primary">Section 1</span>
            <h2>Job Explorer</h2>
            <p>Use the job list links to view an overview or detailed job information.</p>
          </div>
          <div class="card section-card border-0 shadow-sm">
            <div class="card-body p-3 p-lg-4">
              <div class="row g-4">
                <div class="col-lg-4 col-xl-3">
                  <JobListComponent />
                </div>
                <div class="col-lg-8 col-xl-9">
                  <RouterView />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="job-application" class="section-block bg-soft">
        <div class="container">
          <div class="section-heading">
            <span class="badge text-bg-success">Section 2</span>
            <h2>Job Application</h2>
            <p>Complete the form below. It will not submit until all validation checks pass.</p>
          </div>
          <ApplicationFormComponent />
        </div>
      </section>

      <section id="todo-list" class="section-block">
        <div class="container">
          <div class="section-heading">
            <span class="badge text-bg-warning">Section 3</span>
            <h2>To-Do List</h2>
            <p>Add, delete, and update task priorities for your job application workflow.</p>
          </div>
          <ToDoListComponent />
        </div>
      </section>
    </main>

    <footer class="border-top py-4 bg-white">
      <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
        <span>Insight Hire · COS30043 Interface Design and Development</span>
        <span>Student ID: s10556692</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import JobListComponent from './components/JobListComponent.vue'
import ApplicationFormComponent from './components/ApplicationFormComponent.vue'
import ToDoListComponent from './components/ToDoListComponent.vue'

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
