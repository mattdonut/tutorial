
# Getting-Started

This folder contains the results of calling the command 

```
> npx create-react-app getting-started
```

If you checked out this repo, you can try out the default app by installing the dependencies, and then starting the app.

```
> yarn install
> yarn start
```

This should fire up the dev server and automatically open the app in your default browser. Make sure everything is running before we start mucking about in here :)

## Typescript

We're going to be using `Typescript` in this tutorial series, so we need to make sure that it is installed.

```
> yarn add typescript
```

The modern version of create-react-app knows how to use typescript automatically, so the next step is to just change our file types.

Rename `index.js` and `App.js` to `index.tsx` and `App.tsx`

(I like to use the explicit `tsx` extension to let my editor know that its going to be running into that markup)

Now you are using `Typescript`!

Well, technically. `Typescript` is a superset of `Javascript`, so any `.js` file is technically valid `Typescript`. However, if you have your editor set up to be strict, it will complain that many of your variables are implicitly of type `any` because we haven't added any types. So our first task is to type our app Component.

Open `App.tsx` and take a look at what we have. `create-react-app` makes a very basic `FunctionComponent` called `App`. In this case, it is just a plain javascript function that returns a react node using JSX compiling. When the `App` component is loaded, React uses this function as a render method when it is time for the component to display itself. This actually places some restrictions on this function's type signature. The argument structure will define the components prop types, and the return value must be a React Node.

In this case, we don't have any props, since this is the root component, but we would still like to let typescript know that this function is a value React FunctionComponent.

First, we need to `import` the type definition supplied by React as a named export. We are actually going to use the very handy alias `FC` instead of `FunctionComponent`, since it is much shorter

```typescript
import React, {FC} from 'react'
```

To apply a pre-existing type to a function, we need to use a variable and fuction literal assignment. Change the function definition to be:

```typescript
const App: FunctionComponent<{}> = () => {
    //...
}
```

