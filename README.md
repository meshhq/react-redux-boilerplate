# TypeScript React Redux Boilerplate

This repository contains the source code for a `React` `Redux` boilerplate application written in `TypeScript`. 

## Rationale 

Setting up and configuring a new `JavaScript` application built with modern frameworks demands a significant amount of [time and cognitive overhead](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f). 

While the combination of `React`, `Redux`, `TypeScript`, and `Webpack` provide a wonderful stack for writing modern front-end applications, even experienced developers can struggle when getting started with a new application. 

## Objective

The objective of this project is simple: **to provide developers with a pre-configured, standardized application template that allows them to start writing feature code immediately**. 

This project will save developers time and headache when getting started with a new project. It will also provide them with a project structure and configuration that can be used across all of their future applications. 

## Tooling

* [React](https://reactjs.org/) - A modern `JavaScript` framework used to build interactive user interfaces. 
* [Redux](https://redux.js.org/) - A predictable state container for `JavaScript` apps. It helps developers manage state throughout their applications. 
* [Webpack](https://webpack.js.org/) - A static module bundler for modern `JavaScript` applications. Its main purpose is to bundle `JavaScript` files for use in a browser. When webpack processes your application, it recursively builds a dependency graph that includes every module your application needs, then packages all of those modules into one or more bundles.
* [TypeScript](https://www.typescriptlang.org/) - A strongly typed superset of `JavaScript`, that compiles to plain `JavaScript`. Types enable `JavaScript` developers to use highly-productive development tools and practices like static checking and code refactoring.

## Getting Started

To get started, clone the application to your local machine.

```
git clone git@meshhq/react-redux-boilerplate.git
```

Install application dependencies via the following 

```
npm install
```

Once all dependencies are installed, the application can be run locally via the following

```
npm start
```

Visit `http://localhost:3000` in your browser to view the running application. 

## Functionality 

This application intentionally contains minimal functionality, as it is meant to be a starting point for a project. The only UI and functionality this application exposes is user registration and login. 

## Project Structure

This project is built using Mesh's standard `React` `Redux` project structure. It is organized as detailed in the table below:

| Path                  | Type              | Contains                                                            
| ----------------------|-------------------|---------------------------------------------------------------------------|
| `src`                 | Directory         | `TypeScript` source code files for the application.                       |
| `.eslintignore`       | ASCII text        | Tells [ESLint](https://eslint.org/) which files/directories to ignore.    |
| `.eslintrc`           | ASCII text        | Configuration file for [ESLint](https://eslint.org/).                     |
| `.gitignore`          | ASCII text        | Tells `git` which files/directories to ignore.                            |
| `.scss-lint.yml`      | YML Code          | Configuration file for [scss-lint](https://github.com/brigade/scss-lint)  |
| `index.html`          | HTML Code         | Index file for the application.                                           |
| `package-lock.json`   | JSON text         | Lockfile for the application dependencies.                                |  
| `package.json`        | JSON text         | [NPM](https://www.npmjs.com/) configuration file for the application.     |
| `README.md`           | Markdown text     | This comprehensive README file.                                           |
| `tsconfig.json`       | JSON text         | `TypeScript` configuration and compiler options.                          |
| `tslint.json`         | JSON text         | Configuration file for [TSLint](https://github.com/palantir/tslint).      |
| `webpack.config.js`   | JavaScript code   | Configuration file for [Webpack](https://webpack.js.org/).                |    





