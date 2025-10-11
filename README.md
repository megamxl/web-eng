# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices.
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle.
**Let's get coding!**

## Submission Details and Deadlines

- Coding playgrounds are **individual** work
- Use this base template to create your project repository.
- Submit your repository link once. Send me an invitation to your repository if it is set to private:
  > GitHub: leonardo1710
- Each playground must be submitted via a new branch in that repository (last commit within deadline will be graded).
  - Naming conventions of branch: <code>playground-1</code>, <code>playground-2</code>, ...
- Each playground has a total of 20 points available.

### Submission Deadlines

- [1st Playground](#1-js-playground): 23.09.2025
- [2nd Playground](#2-dependency--and-build-management-playground): 14.10.2025
- [3rd Playground](#3-accessibility--and-web-component-playground): 30.10.2025
- [4th Playground](#4-migrate-to-a-frontend-framework): 25.11.2025
- [5th Playground](#5-integrate-a-backend-framework): 17.12.2025

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:

# Coding Playground Description

## K.O. Criteria

- No JS Frameworks allowed to solve the playgrounds 1-4 (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to that!
- No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## 1. JS Playground

## 2. Dependency- and Build Management Playground

Build the application with `npm` and a build and a dependency management tool of your choice (e.g. [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), or others). Additionally, refactor the comments section to be a web component using shadow dom and templates.

### Tasks

- (1) Integrate `npm` and a build management tool into your project.
- (5) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.
- (3) Use ESLint and Prettier inside your project - rulesets can be found below.
- (2) Keep your builds clear and add dependencies to the right build.
- (2) Define the following tasks within `npm scripts`:
  - `dev`: starts the development server.
  - `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
  - `lint`: runs ESLint on all `.js` and `.ts` files in your projects `/src` directory.
  - `lint:fix`: runs and also fixes all issues found by ESLint.
  - `format`: formats all `.js` and `.ts` files in your projects `/src` directory.
  - `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.
- (2) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).
- Configure **2 Workflows** using GitHub Actions, one for development and one for deployment:
  - (2) Development Workflow should at least lint (optionally test) your code when developers push to a branch named `development`.
  - (3) Deployment Workflow is triggered when developers push into `production` branch. It should at least lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice).

> [Deploy](https://megamxl.github.io/web-eng/)

**ESLint Configurations**

Use ESLint configs [standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and [TypeScript ESLint Plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
Your `.eslintrc` file should have the following extensions:

```.eslintrc.yml
...
extends:
  - standard-with-typescript
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
  - prettier
...
```

**Prettier Configurations**

Apply the following ruleset for Prettier:

```.prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80
}
```
