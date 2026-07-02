<template>
  <article v-if="job" class="detail-panel h-100">
    <div class="d-flex flex-column flex-xl-row justify-content-between gap-3 mb-4">
      <div>
        <p class="text-uppercase text-primary fw-semibold mb-2">{{ job.job_id }}</p>
        <h3 class="fw-bold mb-2">{{ job.job_title }}</h3>
        <p class="text-secondary mb-0">{{ job.company }} · {{ job.location }}</p>
      </div>
      <div class="d-flex flex-wrap align-items-start gap-2">
        <span class="badge rounded-pill text-bg-primary">{{ job.category }}</span>
        <span class="badge rounded-pill text-bg-secondary">{{ job.employment_type }}</span>
        <span class="badge rounded-pill text-bg-info text-dark">{{ job.job_level }}</span>
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-6 col-xl-3">
        <div class="info-tile">
          <span>Salary</span>
          <strong>{{ job.salary_range }}</strong>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="info-tile">
          <span>Positions</span>
          <strong>{{ job.positions_available }}</strong>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="info-tile">
          <span>Deadline</span>
          <strong>{{ formatDate(job.application_deadline) }}</strong>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="info-tile">
          <span>Start Date</span>
          <strong>{{ formatDate(job.start_date) }}</strong>
        </div>
      </div>
    </div>

    <section class="mb-4">
      <h4 class="h6 fw-bold">Description</h4>
      <p class="mb-0">{{ job.job_description }}</p>
    </section>

    <div class="row g-4">
      <div class="col-lg-6">
        <h4 class="h6 fw-bold">Required Skills</h4>
        <ul class="skill-list">
          <li v-for="skill in job.required_skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>
      <div class="col-lg-6">
        <h4 class="h6 fw-bold">Preferred Qualifications</h4>
        <ul class="skill-list preferred">
          <li v-for="qualification in job.preferred_qualifications" :key="qualification">
            {{ qualification }}
          </li>
        </ul>
      </div>
    </div>

    <div class="table-responsive mt-4">
      <table class="table table-sm table-borderless detail-table mb-0">
        <tbody>
          <tr>
            <th scope="row">Posted Date</th>
            <td>{{ formatDate(job.posted_date) }}</td>
          </tr>
          <tr>
            <th scope="row">Supervisor</th>
            <td>{{ job.supervisor }}</td>
          </tr>
          <tr>
            <th scope="row">Tags</th>
            <td>
              <span v-for="tag in job.tags" :key="tag" class="badge text-bg-light text-secondary border me-1">
                {{ tag }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>

  <article v-else class="detail-panel h-100">
    <h3 class="fw-bold">Job not found</h3>
    <p class="text-secondary mb-0">Please select a job from the list.</p>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { jobs } from '../data/jobs'

const route = useRoute()
const job = computed(() => jobs.find((item) => item.job_id === route.params.jobId))

function formatDate(value) {
  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(value))
}
</script>
