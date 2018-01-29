#ToDo MVC using Manifold-dx for React

## Configuration
- This was built from create-react-app along with Microsoft's TypeScript conversion script:
  `create-react-app manifold-dx-todo --scripts-version=react-scripts-ts`
- `npm install -S manifold-dx`
- added one line to tsconfig's compilerOptions:  `"baseUrl": "."`
- tslint.json: turned off the "no-any" rule, as we are making use of the feature so often advertised by TypeScript...


### Origins of this app

This example follows Redux documentation and examples, which are then adapted to both TypeScript and Manifold-dx.