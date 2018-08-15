#ToDo MVC using Manifold-dx for React

This app is an example of state management using [manifold-dx](https://github.com/mfsjr/manifold-dx).

## Configuration
- This was built from create-react-app along with Microsoft's TypeScript conversion script:
  `create-react-app manifold-dx-todo --scripts-version=react-scripts-ts`
- `npm install -S manifold-dx`
- added one line to tsconfig's compilerOptions:  `"baseUrl": "."`
- tslint.json: turned off the "no-any" rule, as we are making use of the feature so often advertised by TypeScript...
- enzyme - see enzyme instructions at https://github.com/Microsoft/TypeScript-React-Starter
  - `npm install -D enzyme @types/enzyme react-addons-test-utils`
  - `npm install -D enzyme-adapter-react-16 @types/enzyme-adapter-react-16 react-test-renderer`
  - or simply
    `npm install -D enzyme @types/enzyme react-addons-test-utils enzyme-adapter-react-16 @types/enzyme-adapter-react-16 react-test-renderer`
  - then run `npm test`

### Origins of this app

This example follows Redux documentation and examples, which are then adapted to both TypeScript and Manifold-dx.