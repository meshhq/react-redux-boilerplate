# Typescript React Redux Boilerplate

This repository contains the source code for a React/Redux boilerplate application written in Typescript. 

## Rationale 

Setting up and configuring a new JavaScript application built with modern frameworks demands a significant amount of [time and cognitive overhead](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f). While the combination of react, redux, tyepescrit and webpack provide a wonderful stack for writing modern front end applicaitons, even experienced developers (yours truly included) can struggle when getting started with a new application. 

The goal of this project is simple -- to provide developers with a pre-configured, standardized application starting point that allows them to start writing feature code immediately. 

This project will save developers time and headache when getting started with a new project. It will also provide them with a standardized project strucutre and configuration that can, and should, be used across all of their applications. 

## Getting Started

To get started, clone the application to your local machine.

```
git clone git@meshhg/react-redux-boilerplate.git
```

The project exposes automation commands via gulp. Install application dependecies via the following 

```
gulp install
```

Once all dependecies are installed, the application can be run locally via the following

```
gulp start
```

## Functionality 

This application intentionally contains minimal functionality, as it is meant to be a starting poing for a project. As almost all applications will need user registration, the only UI and functionality this application exposes is user registration and login. 

## Project Structure

This project is built using the Mesh reccomended Typescript project structure. It is organized as detailed in the table below:

| Path                  | Type      | Contains                                                            
| ----------------------|-----------|---------------------------------------------------------------|
| `dist`            	| Directory | Transpiled source code generated via webpack.                 |
| `src`                 | Directory | TypeScript source code files for our application.             |
| `index.html`          | Directory | Starting point for our application.                           |
| `package.json`        | Directory | JSON file describing the project and its dependecies.         |
| `README.md`           | Directory | Contains information and technical detail about the project.  |
| `tsconfig.json`       | Directory | Configuration file for linting TypeScript files.              |
| `webpack.config.js`   | Directory | Source code for the application's dependencies.               |    

## Tooling

This project leverages a suite of modern tooling in order to build its application. The tools and their description are as follows:

### React

React is a JavaScript framework used to build interactive UI. 

### Redux 

Redux is a predictable state container for JavaScript apps. It helps developers manage state throughout their applications. 

### Webpack

Webpack ia static module bundler for modern JavaScript application. Its main purpose is to bundle JavaScript files for use in a browser. When webpack processes your application, it recursively builds a dependency graph that includes every module your application needs, then packages all of those modules into one or more bundles.

### Typescript

TypeScript is a strongly typed superset of JavaScript, that compiles to plain JavaScript. Types enable JavaScript developers to use highly-productive development tools and practices like static checking and code refactoring when developing JavaScript applications.

##### For a blog post. 



