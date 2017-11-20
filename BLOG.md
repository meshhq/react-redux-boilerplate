 Steps

1. npm init the folder
2. Setup project structure
3. npm install --save webpack
- Webpack is responsible for bundling our code into a single JS file for the react app.
4. npm install --save react react-dom @types/react @types/react-dom
- Install react and react dom along with their types
5. npm install --save-dev typescript awesome-typescript-loader source-map-loader
- Add typescript, awsome loder and source map loader. 
- Awesome Loader - Helps webpack compile typescript code using standard typescript tsconfig file.
- Source-map loader - uses any sourcemap outputs from TypeScript to inform webpack when generating its own sourcemaps. This helps with debugging.
6. Create tsconfig file. 
7. Run webpack make sure you compile. 
8. Add a scss base_assets file
9. Add a login component file. 

### Add Support for SCSS Files 

1. npm install --save-dev style-loader
2. npm install --save-dev sass-loader
3. npm install --save-dev css-loader

### Add Helpers

1. npm install --save urijs @types/urijs
2. npm install --save http-errors @types/http-errors

### Add Redux

1. npm install --save redux
2. Add `/store` directory 
3. Add `/reducers` directory

### Add Some Actions

### Add Bootstrap

1. npm install --save react-bootstrap @types/react-bootstrap

### Add More shit

1. npm install --save react-redux @types/react-redux
2. npm install --save react-router-dom @types/react-router-dom