
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

In this case, we don't have any props, since this is the root component, but we would still like to let typescript know that this function is a React FunctionComponent.

First, we need to `import` the type definition supplied by React as a named export. We are actually going to use the very handy alias `FC` instead of `FunctionComponent`, since it is much shorter

```typescript
import React, {FC} from 'react'
```

To apply a pre-existing type to a function, we need to use a variable and function literal assignment. Change the function definition to be:

```typescript
const App: FC = () => {
    //...
}
```

And thats it! This is actually the only definition in our app, since Typescript can automatically infer the types of the JSX elements. Speaking of those elements, it's time to start putting together our actual app.

## Todo

Yup, its a todo list. First up, I've included a simple json file in the project directory `todos.json`. We're just going to display them for now. To do that, we're going to need a component that displays todo items, as well as defining what a todo item is.

Let's start with the data definition. Looking at our data, we can see that todo items have three properties `id`, `text`, and `done`. We are going to create a new file to store our type definitions, so they can be easily shared amongst our components.

Create `TodoTypes.ts` and add our type interface to it:

```typescript
export interface Todo {
    id: number;
    text: string;
    done: boolean;
}
```
This is a `.ts` file since it won't contain any JSX elements.

Now we can create our component. Make a file called `TodoItem.tsx`, and add a basic react FunctionComponent:

```tsx
import React, {FC} from 'react'

export const TodoItem: FC = () => {
    return <div></div>
}
```

Our component needs inputs! Right now all it needs is a `Todo` to display. All React components have a signature of named inputs called `props`, essentially a javascript object that is passed into the component. We need to define what that shape is, and thankfully  `FunctionComponent` is a dynamic type. First we import our data type, then define the interface that will be our props.

```tsx
import React, {FC} from 'react'
import {Todo} from './TodoTypes'

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem: FC = () => {
    return <div></div>
}
```

Now we have to tell our component to use that type as its props interface.

```tsx

export const TodoItem: FC<TodoItemProps> = ({todo}) => {
    return <div></div>
}
```

Two things have happened here:
- We told Typescript and React that our component expects a prop named `todo` that will be a `Todo` object
- We added an object destructuring to our function definition.

Effectively, we define the props in an interface, and then an object of that shape will show up as the argument to our render function. Not only that, but Typescript will know that the variable `todo` in the render function will have type `Todo`, and will know all of the available properties that it will have ahead of time. If someone tries to use our component wrong, Typescript will likely spot it.

Now lets make our component display something

```tsx
export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
    return (
        <div>
            <input type="checkbox" checked={todo.done} />
            <label>{todo.text}</label>
        </div>
    )
}
```

Time to use our component!

Open up `App.tsx` and import our `TodoItem` component:


```tsx
import React, { FC } from 'react';
import data from './todos.json'
import { TodoItem } from './TodoItem'


const App: FC = () => {
  return (
    <div className="App">
      {data.map(todo => <TodoItem todo={todo} />)}
    </div>
  );
}
```
Some very basic React here, we map over the list of todo objects in our json, and return a `TodoItem` for each one.

Now fire up the test server and see what we have.

```
> yarn start
```

It should all compile and you should have a running Typescript React App!
