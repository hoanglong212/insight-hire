import { computed, reactive, ref } from "vue";
import {
  RouterLink,
  RouterView,
  createRouter,
  createWebHashHistory,
  useRoute,
} from "vue-router";
import { jobs } from "./data/jobs.js";

const JobOverviewComponent = {
  name: "JobOverviewComponent",
  template: `
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
  `,
  setup() {
    const categorySummary = computed(() => {
      const summary = jobs.reduce((groups, job) => {
        groups[job.category] = (groups[job.category] || 0) + 1;
        return groups;
      }, {});

      return Object.entries(summary).map(([name, count]) => ({ name, count }));
    });

    return {
      jobs,
      categorySummary,
    };
  },
};

const JobListComponent = {
  name: "JobListComponent",
  components: { RouterLink },
  template: `
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
          :to="'/jobs/' + job.job_id"
        >
          <div class="d-flex justify-content-between align-items-center gap-2">
            <strong>{{ job.job_id }}</strong>
            <span class="small">{{ job.category }}</span>
          </div>
          <span class="small d-block text-truncate">{{ job.job_title }}</span>
        </RouterLink>
      </div>
    </aside>
  `,
  setup() {
    return { jobs };
  },
};

const JobDetailComponent = {
  name: "JobDetailComponent",
  template: `
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
  `,
  setup() {
    const route = useRoute();
    const job = computed(() =>
      jobs.find((item) => item.job_id === route.params.jobId),
    );

    function formatDate(value) {
      return new Intl.DateTimeFormat("en-AU", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(value));
    }

    return {
      job,
      formatDate,
    };
  },
};

const ApplicationFormComponent = {
  name: "ApplicationFormComponent",
  template: `
    <div class="card border-0 shadow-sm section-card">
      <div class="card-body p-3 p-lg-4">
        <div v-if="submitted" class="submission-result">
          <div class="text-center mb-4">
            <div class="result-icon-wrapper">
              <svg class="result-icon-svg" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                <circle class="result-icon-circle" cx="26" cy="26" r="24" fill="none" stroke-width="3" />
                <path class="result-icon-check" fill="none" stroke-width="3" d="M14 27l7 7 16-16" />
              </svg>
            </div>
            <h3 class="fw-bold mt-3 mb-1">Application Submitted Successfully!</h3>
            <p class="text-secondary mb-0">
              Your application has been sent. Below is a summary of your submitted information.
            </p>
          </div>

          <div class="result-grid">
            <div class="result-item" v-for="item in submittedFields" :key="item.label">
              <span class="result-label">{{ item.label }}</span>
              <span class="result-value">{{ item.value || '—' }}</span>
            </div>
          </div>

          <div class="d-flex flex-column flex-sm-row gap-2 mt-4 justify-content-center">
            <button class="btn btn-primary" type="button" @click="resetForm">
              Submit Another Application
            </button>
          </div>
        </div>

        <form
          v-else
          method="post"
          action="http://mercury.swin.edu.au/it000000/formtest.php"
          novalidate
          @submit="handleSubmit"
        >
          <fieldset class="mb-4">
            <legend>Personal Information</legend>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="firstName" class="form-label">First Name</label>
                <input
                  id="firstName"
                  v-model.trim="form.firstName"
                  name="firstName"
                  type="text"
                  class="form-control"
                  :class="inputClass('firstName')"
                  autocomplete="given-name"
                  @blur="touch('firstName')"
                />
                <p v-if="showError('firstName')" class="invalid-feedback d-block">{{ errors.firstName }}</p>
              </div>

              <div class="col-md-6">
                <label for="lastName" class="form-label">Last Name</label>
                <input
                  id="lastName"
                  v-model.trim="form.lastName"
                  name="lastName"
                  type="text"
                  class="form-control"
                  :class="inputClass('lastName')"
                  autocomplete="family-name"
                  @blur="touch('lastName')"
                />
                <p v-if="showError('lastName')" class="invalid-feedback d-block">{{ errors.lastName }}</p>
              </div>

              <div class="col-md-6">
                <label for="dateOfBirth" class="form-label">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  v-model="form.dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  class="form-control"
                  :class="inputClass('dateOfBirth')"
                  @blur="touch('dateOfBirth')"
                />
                <p v-if="showError('dateOfBirth')" class="invalid-feedback d-block">{{ errors.dateOfBirth }}</p>
              </div>
            </div>
          </fieldset>

          <fieldset class="mb-4">
            <legend>Account Details</legend>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="username" class="form-label">Username</label>
                <input
                  id="username"
                  v-model.trim="form.username"
                  name="username"
                  type="text"
                  class="form-control"
                  :class="inputClass('username')"
                  autocomplete="username"
                  @blur="touch('username')"
                />
                <p v-if="showError('username')" class="invalid-feedback d-block">{{ errors.username }}</p>
              </div>

              <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  v-model.trim="form.email"
                  name="email"
                  type="email"
                  class="form-control"
                  :class="inputClass('email')"
                  autocomplete="email"
                  @blur="touch('email')"
                />
                <p v-if="showError('email')" class="invalid-feedback d-block">{{ errors.email }}</p>
              </div>

              <div class="col-md-6">
                <label for="password" class="form-label">Password</label>
                <input
                  id="password"
                  v-model="form.password"
                  name="password"
                  type="password"
                  class="form-control"
                  :class="inputClass('password')"
                  autocomplete="new-password"
                  @blur="touch('password')"
                />
                <p v-if="showError('password')" class="invalid-feedback d-block">{{ errors.password }}</p>
              </div>

              <div class="col-md-6">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  name="confirmPassword"
                  type="password"
                  class="form-control"
                  :class="inputClass('confirmPassword')"
                  autocomplete="new-password"
                  @blur="touch('confirmPassword')"
                />
                <p v-if="showError('confirmPassword')" class="invalid-feedback d-block">
                  {{ errors.confirmPassword }}
                </p>
              </div>
            </div>
          </fieldset>

          <fieldset class="mb-4">
            <legend>Address</legend>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="streetAddress" class="form-label">Street Address</label>
                <input
                  id="streetAddress"
                  v-model.trim="form.streetAddress"
                  name="streetAddress"
                  type="text"
                  class="form-control"
                  :class="inputClass('streetAddress')"
                  maxlength="40"
                  autocomplete="street-address"
                  @blur="touch('streetAddress')"
                />
                <p v-if="showError('streetAddress')" class="invalid-feedback d-block">
                  {{ errors.streetAddress }}
                </p>
              </div>

              <div class="col-md-6">
                <label for="suburb" class="form-label">Suburb</label>
                <input
                  id="suburb"
                  v-model.trim="form.suburb"
                  name="suburb"
                  type="text"
                  class="form-control"
                  :class="inputClass('suburb')"
                  maxlength="20"
                  @blur="touch('suburb')"
                />
                <p v-if="showError('suburb')" class="invalid-feedback d-block">{{ errors.suburb }}</p>
              </div>

              <div class="col-md-6">
                <label for="postcode" class="form-label">Postcode</label>
                <input
                  id="postcode"
                  v-model.trim="form.postcode"
                  name="postcode"
                  type="text"
                  inputmode="numeric"
                  class="form-control"
                  :class="inputClass('postcode')"
                  placeholder="e.g. 0300"
                  @blur="touch('postcode')"
                />
                <p v-if="showError('postcode')" class="invalid-feedback d-block">{{ errors.postcode }}</p>
              </div>

              <div class="col-md-6">
                <label for="mobileNumber" class="form-label">Mobile Number</label>
                <input
                  id="mobileNumber"
                  v-model.trim="form.mobileNumber"
                  name="mobileNumber"
                  type="text"
                  inputmode="numeric"
                  class="form-control"
                  :class="inputClass('mobileNumber')"
                  placeholder="04xxxxxxxx"
                  @blur="touch('mobileNumber')"
                />
                <p v-if="showError('mobileNumber')" class="invalid-feedback d-block">
                  {{ errors.mobileNumber }}
                </p>
              </div>
            </div>
          </fieldset>

          <fieldset class="mb-4">
            <legend>Job Preference</legend>
            <div class="row g-3 align-items-end">
              <div class="col-md-6">
                <label for="preferredJobCategory" class="form-label">Preferred Job Category</label>
                <select
                  id="preferredJobCategory"
                  v-model="form.preferredJobCategory"
                  name="preferredJobCategory"
                  class="form-select"
                  :class="inputClass('preferredJobCategory')"
                  @blur="touch('preferredJobCategory')"
                >
                  <option value="">-- Please select --</option>
                  <option value="AI">AI</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Software Development">Software Development</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
                <p v-if="showError('preferredJobCategory')" class="invalid-feedback d-block">
                  {{ errors.preferredJobCategory }}
                </p>
              </div>
            </div>
          </fieldset>

          <div class="d-flex flex-column flex-md-row gap-2 align-items-md-center">
            <button class="btn btn-outline-secondary" type="button" @click="showTerms = !showTerms">
              Terms and Conditions
            </button>
            <button class="btn btn-primary" type="submit">Submit</button>
            <span v-if="submitAttempted && hasErrors" class="text-danger small">
              Please fix the validation errors before submitting.
            </span>
          </div>

          <div v-if="showTerms" class="alert alert-info mt-3 mb-0" role="alert">
            By submitting this application, you confirm that the information provided is accurate and may be used for
            recruitment assessment by Insight Hire.
          </div>
        </form>
      </div>
    </div>
  `,
  setup() {
    const form = reactive({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      streetAddress: "",
      suburb: "",
      postcode: "",
      mobileNumber: "",
      dateOfBirth: "",
      preferredJobCategory: "",
    });

    const touched = reactive({});
    const submitAttempted = ref(false);
    const showTerms = ref(false);
    const submitted = ref(false);

    const fieldLabels = {
      firstName: "First Name",
      lastName: "Last Name",
      dateOfBirth: "Date of Birth",
      username: "Username",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      streetAddress: "Street Address",
      suburb: "Suburb",
      postcode: "Postcode",
      mobileNumber: "Mobile Number",
      preferredJobCategory: "Preferred Job Category",
    };

    const submittedFields = ref([]);

    const lettersOnlyPattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const specialCharacterPattern = /[$%^&*]/;
    const postcodePattern = /^\d{4}$/;
    const mobilePattern = /^04\d{8}$/;

    const errors = computed(() => {
      const result = {};

      if (!form.firstName) {
        result.firstName = "First name is required.";
      } else if (!lettersOnlyPattern.test(form.firstName)) {
        result.firstName = "First name must contain letters only.";
      }

      if (!form.lastName) {
        result.lastName = "Last name is required.";
      } else if (!lettersOnlyPattern.test(form.lastName)) {
        result.lastName = "Last name must contain letters only.";
      }

      if (!form.username) {
        result.username = "Username is required.";
      } else if (form.username.length < 3) {
        result.username = "Username must be at least 3 characters.";
      }

      if (!form.password) {
        result.password = "Password is required.";
      } else if (form.password.length < 8) {
        result.password = "Password must be at least 8 characters.";
      } else if (!specialCharacterPattern.test(form.password)) {
        result.password =
          "Password must include at least one special character: $, %, ^, &, or *.";
      }

      if (!form.confirmPassword) {
        result.confirmPassword = "Confirm password is required.";
      } else if (form.confirmPassword !== form.password) {
        result.confirmPassword = "Confirm password must match the password.";
      }

      if (!form.email) {
        result.email = "Email is required.";
      } else if (!emailPattern.test(form.email)) {
        result.email = "Email must be in a valid format.";
      }

      if (form.streetAddress.length > 40) {
        result.streetAddress = "Street address must be 40 characters or fewer.";
      }

      if (form.suburb.length > 20) {
        result.suburb = "Suburb must be 20 characters or fewer.";
      }

      if (!form.postcode) {
        result.postcode = "Postcode is required.";
      } else if (!postcodePattern.test(form.postcode)) {
        result.postcode = "Postcode must be exactly 4 digits.";
      }

      if (!form.mobileNumber) {
        result.mobileNumber = "Mobile number is required.";
      } else if (!mobilePattern.test(form.mobileNumber)) {
        result.mobileNumber =
          "Mobile number must be 10 digits and start with 04.";
      }

      if (!form.dateOfBirth) {
        result.dateOfBirth = "Date of birth is required.";
      } else if (!isValidAge(form.dateOfBirth)) {
        result.dateOfBirth = "Applicant must be at least 16 years old.";
      }

      if (!form.preferredJobCategory) {
        result.preferredJobCategory = "Preferred job category is required.";
      }

      return result;
    });

    const hasErrors = computed(() => Object.keys(errors.value).length > 0);

    function isValidAge(dateValue) {
      const birthDate = new Date(dateValue);
      if (Number.isNaN(birthDate.getTime())) {
        return false;
      }

      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const hasBirthdayPassed =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() >= birthDate.getDate());

      if (!hasBirthdayPassed) {
        age -= 1;
      }

      return age >= 16;
    }

    function touch(field) {
      touched[field] = true;
    }

    function showError(field) {
      return Boolean(
        errors.value[field] && (touched[field] || submitAttempted.value),
      );
    }

    function inputClass(field) {
      if (showError(field)) {
        return "is-invalid";
      }

      if (
        (touched[field] || submitAttempted.value) &&
        !errors.value[field] &&
        form[field]
      ) {
        return "is-valid";
      }

      return "";
    }

    function handleSubmit(event) {
      event.preventDefault();
      submitAttempted.value = true;
      Object.keys(form).forEach((field) => touch(field));

      if (hasErrors.value) {
        return;
      }

      submittedFields.value = Object.entries(fieldLabels).map(
        ([key, label]) => ({
          label,
          value:
            key === "password" || key === "confirmPassword"
              ? "••••••••"
              : form[key] || "—",
        }),
      );

      const hiddenForm = document.createElement("form");
      hiddenForm.method = "post";
      hiddenForm.action = "http://mercury.swin.edu.au/it000000/formtest.php";
      hiddenForm.target = "_blank";
      hiddenForm.style.display = "none";
      Object.entries(form).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        hiddenForm.appendChild(input);
      });
      document.body.appendChild(hiddenForm);
      hiddenForm.submit();
      document.body.removeChild(hiddenForm);

      submitted.value = true;
    }

    function resetForm() {
      Object.keys(form).forEach((key) => (form[key] = ""));
      Object.keys(touched).forEach((key) => delete touched[key]);
      submitAttempted.value = false;
      submitted.value = false;
      showTerms.value = false;
      submittedFields.value = [];
    }

    return {
      form,
      errors,
      submittedFields,
      submitAttempted,
      showTerms,
      submitted,
      hasErrors,
      touch,
      showError,
      inputClass,
      handleSubmit,
      resetForm,
    };
  },
};

const ToDoListComponent = {
  name: "ToDoListComponent",
  template: `
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
  `,
  setup() {
    const newTask = ref("");
    const taskError = ref("");
    const tasks = ref([
      { id: 1, text: "Prepare for the interview", priority: "High" },
      { id: 2, text: "Submit job application form", priority: "Low" },
    ]);

    function addTask() {
      if (!newTask.value) {
        taskError.value = "Please enter a task before adding it.";
        return;
      }

      tasks.value.unshift({
        id: Date.now(),
        text: newTask.value,
        priority: "Low",
      });

      newTask.value = "";
      taskError.value = "";
    }

    function deleteTask(taskId) {
      tasks.value = tasks.value.filter((task) => task.id !== taskId);
    }

    function togglePriority(taskId) {
      const task = tasks.value.find((item) => item.id === taskId);
      if (task) {
        task.priority = task.priority === "High" ? "Low" : "High";
      }
    }

    function priorityClass(priority) {
      return priority === "High" ? "text-danger fw-semibold" : "text-secondary";
    }

    function priorityBadgeClass(priority) {
      return priority === "High"
        ? "badge text-bg-danger"
        : "badge text-bg-secondary";
    }

    return {
      newTask,
      taskError,
      tasks,
      addTask,
      deleteTask,
      togglePriority,
      priorityClass,
      priorityBadgeClass,
    };
  },
};

const App = {
  name: "AppShell",
  components: {
    RouterView,
    JobListComponent,
    ApplicationFormComponent,
    ToDoListComponent,
  },
  template: `
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
  `,
  setup() {
    function scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    return { scrollToSection };
  },
};

const routes = [
  {
    path: "/",
    redirect: "/jobs/overview",
  },
  {
    path: "/jobs/overview",
    name: "job-overview",
    component: JobOverviewComponent,
  },
  {
    path: "/jobs/:jobId",
    name: "job-detail",
    component: JobDetailComponent,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/jobs/overview",
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return false;
  },
});

export { App, router };
