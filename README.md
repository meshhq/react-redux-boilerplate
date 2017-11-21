# Typescript React Redux Boilerplate

This repository contains the source code for a React/Redux boilerplate application written in Typescript. 

## Rationale 

Setting up and configuring a new JavaScript application built with modern frameworks demands a significant amount of [time and cognitive overhead](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f). While the combination of `react`, `redux`, `tyepescript` and `webpack` provide a wonderful stack for writing modern front end applicaitons, even experienced developers can struggle when getting started with a new application. 

The goal of this project is simple: **to provide developers with a pre-configured, standardized application starting point that allows them to start writing feature code immediately**. 

This project will save developers time and headache when getting started with a new project. It will also provide them with a standardized project strucutre and configuration that can be used across all of their applications. 

## Getting Started

To get started, clone the application to your local machine.

```
git clone git@meshhg/react-redux-boilerplate.git
```

Install application dependecies via the following 

```
npm install
```

Once all dependecies are installed, the application can be run locally via the following

```
npm start
```

## Functionality 

This application intentionally contains minimal functionality, as it is meant to be a starting poing for a project. The only UI and functionality this application exposes is user registration and login. 

## Project Structure

This project is built using the Mesh's standard React/Redux project structure. It is organized as detailed in the table below:

| Path                  | Type              | Contains                                                            
| ----------------------|-------------------|---------------------------------------------------------------|
| `dist`            	| Directory         | Transpiled source code generated via Webpack.                 |
| `src`                 | Directory         | TypeScript source code files for the application.             |
| `.eslintignore`       | ASCII text        | Tells eslint which files/directories to ignore.               |
| `.eslintrc`           | ASCII text        | Configuration file for ESLint                                 |
| `.gitignore`          | ASCII text        | Tells eslint which files/directories to ignore.               |
| `.scss-lint.yml`      | YML Code          | Configuration file for scss-lint                              |
| `index.html`          | HTML Code         | Index file for the application.                               |
| `package-lock.json`   | JSON text         | Lockfile for the application dependencies.                    |
| `package.json`        | JSON text         | NPM configuration file for the application.                   |
| `README.md`           | Markdown text     | This comprehensive README file.                               |
| `tsconfig.json`       | JSON text         | Typescript configuration and compiler options.                |
| `tslint.json`         | JSON text         | Configuration file for TSLint.                                |
| `webpack.config.js`   | JavaScript code   | Configuration file for Webpack.                               |    

## Tooling

This project leverages a suite of modern tooling in order to build the application. The tools and their description are as follows:

### React

React is a JavaScript framework used to build interactive UI. 

### Redux 

Redux is a predictable state container for JavaScript apps. It helps developers manage state throughout their applications. 

### Webpack

Webpack ia static module bundler for modern JavaScript application. Its main purpose is to bundle JavaScript files for use in a browser. When webpack processes your application, it recursively builds a dependency graph that includes every module your application needs, then packages all of those modules into one or more bundles.

### Typescript

TypeScript is a strongly typed superset of JavaScript, that compiles to plain JavaScript. Types enable JavaScript developers to use highly-productive development tools and practices like static checking and code refactoring when developing JavaScript applications.



