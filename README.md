# Comfy Store

## Project in Action

[Comfy Store](https://comfy-store-ts.netlify.app)

## Introduction

Comfy Store is just a basic e-commerce fictional website. You can create an account and then log in to your account. After that, you can view products, filter them based on your needs, and add your chosen product to your shopping cart. For each product, you can choose your preferred color if more than one option is available. In addition to that, you can choose the amount of your products.
For example, you can select _Chic Chair_ product for your house. You can select between the three colors that the store offers to you. Red, green and blue. Also, you can select the amounts you need. In the end, you can click on the _Add to bag_ button.
You can check out your order and see your order on the orders page.

## Tools & Technologies

For the development of this project, these tools/technologies/libraries are used:

- HTML
- CSS
- TypeScript
- React.js (Vite Boilerplate)
- Tailwind CSS
- DaisyUI (A component library for Tailwind CSS)
- Axios
- Redux & Redux Toolkit
- React Router
- TanStack Query (React Query)
- React Icons
- React-Toastify
- DayJS

## Installation & Run The App Locally

To install all dependencies you should run the `npm install` command in your terminal.

To run and view this app, you should run the `npm run dev` command in your terminal.

You can use the command down below to perform both commands at the same time.

```sh
npm run i && npm run dev
```

Visit url [http://localhost:5173] to interact with the app.

## Notes

- For styling, the entire project heavily relies on Tailwind CSS and DaisyUI.

- All of the responses that come back from the API are modeled with interfaces or types in TypeScript.

- It's been made a serious effort for all objects and properties in all of the used libraries to be type-safe and the whole app remains consistent for the sake of typescript goals.

- For state management redux toolkit is used. The store consists of two slices:
  User slice
  Cart slice

- For HTTP request handling, this project relies on React Router v6.4+ features specifically loader and action functions.

- React query is used for caching the responses and improving the user experience by offering almost seamless browsing through the website.

- It's a front-end project. I didn't develop the back-end and have no information about the implementation of it. However, [Here](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi) you can read a brief documentation provided by John Smilga, The original contributor of the project, for the API.

This is just a demo project for educational purposes and heavily based on [React 18 Tutorial and Projects Udemy Course](https://www.udemy.com/course/react-tutorial-and-projects-course) Comfy Store project. You can visit the Github repository of the original project in [here](https://github.com/john-smilga/react-course-v3/tree/main/12-comfy-store).
