# TypeScript Hello-World

## Compile a typescript file

- Create a new project with
  - `mkdir typescript-intro`
  - `cd typescript-intro`
  - `npm init -y`
  - Set `"type": "module"` in package.json
- Install TypeScript
  - `npm install typescript --save-dev`
- Create a `tsconfig.json` file with
  - `npx tsc --init`
  - Set `"outDir": "dist"`
  - Set `"module": "Node16"`
  - Set `"moduleResolution": "Node16"`
- Create a the first typescript file `src/hello-world.ts`
- Add the following code to the file

  ```typescript
  const message: string = "Hello World";
  console.log(message);
  ```

- Compile the typescript file with
  - `npx tsc`
- Run the compiled JavaScript file with
  - `node dist/hello-world.js`

## Use ts-node

- Install ts-node
  - `npm install ts-node --save-dev`
- Run the typescript file with
  - `npx ts-node-esm src/01_hello_world.ts`
