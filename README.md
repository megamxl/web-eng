# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices. 
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle. 
**Let's get coding!**

## Submission Details and Deadlines
* Coding playgrounds are **individual** work
* Use this base template to create your project repository.
* Submit your repository link once. Send me an invitation to your repository if it is set to private:
  > GitHub: leonardo1710
* Each playground must be submitted via a new branch in that repository (last commit within deadline will be graded).
  * Naming conventions of branch: <code>playground-1</code>, <code>playground-2</code>, ...
* Each playground has a total of 20 points available.

### Submission Deadlines
* [1st Playground](#1-js-playground): 23.09.2025
* [2nd Playground](#2-dependency--and-build-management-playground): 14.10.2025
* [3rd Playground](#3-accessibility--and-web-component-playground): 30.10.2025
* [4th Playground](#4-migrate-to-a-frontend-framework): 25.11.2025
* [5th Playground](#5-integrate-a-backend-framework): 17.12.2025

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:


# Coding Playground Description

## K.O. Criteria
* No JS Frameworks allowed to solve the playgrounds 1-4 (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to that!
* No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## 1. JS Playground
The provided base project template contains bad coding and templating practices and bugs for you to fix. Take a look into the component files and get a grasp of the inner workings of the provided project. The app should provide the requirements described below. Some are implemented poorly or do not work at all. 

### App Requirements
* On page load the app requests the Wikipedia API to extract bear information from Wikipedia's [list of ursids](https://en.wikipedia.org/wiki/List_of_ursids). The page then renders the provided image, the common name, the scientific name and it's range.
  * the bears should be ordered in the same order and number (no duplicates) as in the corresponding Wiki page.
  * if there is no image available, the app should show a placeholder image.
* Users are able to toggle the comment section.
* Users are able to leave their name and a comment (both should not be empty).
* Users are able to search the web page contents using a search query, whereby only the html contents with tag <code>article</code> should be highlighted.

### Tasks
Fix application code and answer the questions:
* (4) Split the code into separate script files and make use of <b>JS modules</b>.
* (4) Fix the semantical issues in the code based on the provided requirements.
* (4) Add proper error handling to the code using ``try/catch`` and provide useful error messages to the users. Additionally, check the image URL availability before rendering the images in HTML. Provide placeholder images if the given URL does not exist.
* (4) Adapt the code to use ``async/await`` instead of the ``then()``-callback hell and refactor the functions to use arrow function syntax instead of ``function()``-syntax.
* (4) Eliminate the remaining bad coding practices that you can find. Take notes of why they are a bad practice and how you did fix it below. 

> **What bad coding practices did you find? Why is it a bad practice and how did you fix it?**
> 
> _Present your findings here..._
>
> ```js
> console.log('Make use of markdown codesnippets to show and explain good/bad practices!')
> ```


