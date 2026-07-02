<template>
  <aside class="job-list-panel">
    <h3 class="h5 fw-bold mb-3">Available Jobs</h3>
    <div class="list-group list-group-flush rounded-3 overflow-hidden border">
      <RouterLink
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        active-class="active"
        to="/jobs/overview"
      >
        <span>Overview</span>
        <span class="badge rounded-pill text-bg-light text-primary">Intro</span>
      </RouterLink>

      <RouterLink
        v-for="job in jobs"
        :key="job.job_id"
        class="list-group-item list-group-item-action"
        active-class="active"
        :to="`/jobs/${job.job_id}`"
      >
        <div class="d-flex justify-content-between align-items-center gap-2">
          <strong>{{ job.job_id }}</strong>
          <span class="small">{{ job.category }}</span>
        </div>
        <span class="small d-block text-truncate">{{ job.job_title }}</span>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { jobs } from '../data/jobs'
</script>
