# Insight Hire - COS30043 Assignment 2

Student ID: s10556692

This is a Vue 3 + Vite + Bootstrap implementation of the Insight Hire assignment.

## Features

- Job Explorer using Vue Router
- JobListComponent, JobOverviewComponent, JobDetailComponent in separated files
- ApplicationFormComponent with required validation rules and `<fieldset>` grouping
- ToDoListComponent with add, delete, and High/Low priority toggle
- Bootstrap imported locally through npm, not CDN
- Vite base path configured for Mercury:
  `/cos30043/s10556692/A2/`

## Run locally

```bash
npm install
npm run dev
```

## Build for Mercury

```bash
npm run build
```

Upload the contents of the `dist` folder to:

```text
public_html/cos30043/s10556692/A2/
```

Expected URL:

```text
http://mercury.swin.edu.au/cos30043/s10556692/A2/
```

## Important note

The form uses the assignment-required testing action:

```html
<form method="post" action="http://mercury.swin.edu.au/it000000/formtest.php">
```
