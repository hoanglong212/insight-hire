<template>
  <article class="detail-panel h-100">
    <div class="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
      <div>
        <p class="text-uppercase text-primary fw-semibold mb-2">Job Overview</p>
        <h3 class="fw-bold mb-2">Welcome to Insight Hire</h3>
        <p class="text-secondary mb-0">
          Insight Hire connects students and early-career professionals with opportunities across artificial intelligence,
          data science, cybersecurity, cloud, and software development.
        </p>
      </div>
      <div class="overview-stat shadow-sm">
        <strong>{{ jobs.length }}</strong>
        <span>Jobs listed</span>
      </div>
    </div>

    <p>
      Use the job links on the left to view full details including company, location, employment type, salary range,
      required skills, application deadline, supervisor, and start date. The application form below includes validation
      to help applicants provide accurate information before submission.
    </p>

    <div class="row g-3 mt-3">
      <div class="col-md-4" v-for="category in categorySummary" :key="category.name">
        <div class="mini-card h-100">
          <span class="badge text-bg-primary mb-2">{{ category.count }}</span>
          <h4 class="h6 fw-bold mb-1">{{ category.name }}</h4>
          <p class="small text-secondary mb-0">Available role category</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { jobs } from '../data/jobs'

const categorySummary = computed(() => {
  const summary = jobs.reduce((groups, job) => {
    groups[job.category] = (groups[job.category] || 0) + 1
    return groups
  }, {})

  return Object.entries(summary).map(([name, count]) => ({ name, count }))
})
</script>
