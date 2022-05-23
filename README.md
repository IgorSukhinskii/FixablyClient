# Fixably Client
A small api client developed for developer assignment at *Fixably*

## Getting Started

```bash
yarn
yarn start
```

After that, visit `localhost:3000` in your browser.

You will be prompted to enter your access code for the API to log in.

After a valid access code is provided, you will see the pages for completed assignments.

## Dependencies

### MUI (Material UI)

`MUI` is used for styling as a UI components library.

Why it's chosen: I'm familiar with it, and it's an easy option that provides everything needed out of the box.

### Axios

`Axios` is used for HTTP requests.

Again, pretty much a default option for most React projects these days, no surprises here.

Extensive functionality, very clear promise-based interface, automatic serialization into `multipart/form-data`

### Wouter

`Wouter is used as an SPA (Single-Page App) router.

The most widely used option here is `react-router`, however `wouter` seems good enough while being significantly more compact.