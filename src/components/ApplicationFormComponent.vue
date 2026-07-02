<template>
  <div class="card border-0 shadow-sm section-card">
    <div class="card-body p-3 p-lg-4">
      <!-- ── Submission Results ── -->
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

      <!-- ── Application Form ── -->
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
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const form = reactive({
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  streetAddress: '',
  suburb: '',
  postcode: '',
  mobileNumber: '',
  dateOfBirth: '',
  preferredJobCategory: ''
})

const touched = reactive({})
const submitAttempted = ref(false)
const showTerms = ref(false)
const submitted = ref(false)

const fieldLabels = {
  firstName: 'First Name',
  lastName: 'Last Name',
  dateOfBirth: 'Date of Birth',
  username: 'Username',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  streetAddress: 'Street Address',
  suburb: 'Suburb',
  postcode: 'Postcode',
  mobileNumber: 'Mobile Number',
  preferredJobCategory: 'Preferred Job Category'
}

const submittedFields = ref([])

const lettersOnlyPattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const specialCharacterPattern = /[$%^&*]/
const postcodePattern = /^\d{4}$/
const mobilePattern = /^04\d{8}$/

const errors = computed(() => {
  const result = {}

  if (!form.firstName) {
    result.firstName = 'First name is required.'
  } else if (!lettersOnlyPattern.test(form.firstName)) {
    result.firstName = 'First name must contain letters only.'
  }

  if (!form.lastName) {
    result.lastName = 'Last name is required.'
  } else if (!lettersOnlyPattern.test(form.lastName)) {
    result.lastName = 'Last name must contain letters only.'
  }

  if (!form.username) {
    result.username = 'Username is required.'
  } else if (form.username.length < 3) {
    result.username = 'Username must be at least 3 characters.'
  }

  if (!form.password) {
    result.password = 'Password is required.'
  } else if (form.password.length < 8) {
    result.password = 'Password must be at least 8 characters.'
  } else if (!specialCharacterPattern.test(form.password)) {
    result.password = 'Password must include at least one special character: $, %, ^, &, or *.'
  }

  if (!form.confirmPassword) {
    result.confirmPassword = 'Confirm password is required.'
  } else if (form.confirmPassword !== form.password) {
    result.confirmPassword = 'Confirm password must match the password.'
  }

  if (!form.email) {
    result.email = 'Email is required.'
  } else if (!emailPattern.test(form.email)) {
    result.email = 'Email must be in a valid format.'
  }

  if (form.streetAddress.length > 40) {
    result.streetAddress = 'Street address must be 40 characters or fewer.'
  }

  if (form.suburb.length > 20) {
    result.suburb = 'Suburb must be 20 characters or fewer.'
  }

  if (!form.postcode) {
    result.postcode = 'Postcode is required.'
  } else if (!postcodePattern.test(form.postcode)) {
    result.postcode = 'Postcode must be exactly 4 digits.'
  }

  if (!form.mobileNumber) {
    result.mobileNumber = 'Mobile number is required.'
  } else if (!mobilePattern.test(form.mobileNumber)) {
    result.mobileNumber = 'Mobile number must be 10 digits and start with 04.'
  }

  if (!form.dateOfBirth) {
    result.dateOfBirth = 'Date of birth is required.'
  } else if (!isValidAge(form.dateOfBirth)) {
    result.dateOfBirth = 'Applicant must be at least 16 years old.'
  }

  if (!form.preferredJobCategory) {
    result.preferredJobCategory = 'Preferred job category is required.'
  }

  return result
})

const hasErrors = computed(() => Object.keys(errors.value).length > 0)

function isValidAge(dateValue) {
  const birthDate = new Date(dateValue)
  if (Number.isNaN(birthDate.getTime())) {
    return false
  }

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

  if (!hasBirthdayPassed) {
    age -= 1
  }

  return age >= 16
}

function touch(field) {
  touched[field] = true
}

function showError(field) {
  return Boolean(errors.value[field] && (touched[field] || submitAttempted.value))
}

function inputClass(field) {
  if (showError(field)) {
    return 'is-invalid'
  }

  if ((touched[field] || submitAttempted.value) && !errors.value[field] && form[field]) {
    return 'is-valid'
  }

  return ''
}

function handleSubmit(event) {
  event.preventDefault()
  submitAttempted.value = true
  Object.keys(form).forEach((field) => touch(field))

  if (hasErrors.value) {
    return
  }

  // Build the submitted data for styled display
  submittedFields.value = Object.entries(fieldLabels).map(([key, label]) => ({
    label,
    value: key === 'password' || key === 'confirmPassword'
      ? '••••••••'
      : (form[key] || '—')
  }))

  // Also submit to formtest.php in a new tab for assignment requirement
  const hiddenForm = document.createElement('form')
  hiddenForm.method = 'post'
  hiddenForm.action = 'http://mercury.swin.edu.au/it000000/formtest.php'
  hiddenForm.target = '_blank'
  hiddenForm.style.display = 'none'
  Object.entries(form).forEach(([key, value]) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = value
    hiddenForm.appendChild(input)
  })
  document.body.appendChild(hiddenForm)
  hiddenForm.submit()
  document.body.removeChild(hiddenForm)

  submitted.value = true
}

function resetForm() {
  Object.keys(form).forEach((key) => (form[key] = ''))
  Object.keys(touched).forEach((key) => delete touched[key])
  submitAttempted.value = false
  submitted.value = false
  showTerms.value = false
  submittedFields.value = []
}
</script>
