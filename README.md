# Adonis Preact

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Preact provider for AdonisJS.


## Prerequisites

This provider requires AdonisJS v5 preview and won't work with AdonisJS v4.

## Installation

```console
npm i adonis-preact preact
node ace invoke adonis-preact
```

You'll also need to add `"jsx": "react"` to the `compilerOptions` of your
TypeScript configuration.

## Usage

### Writing a layout component

`adonis-preact` doesn't create any HTML
for you, so you will probably need to write a layout component that contains
the base structure for your page:

```tsx
// app/Components/layouts/Base.tsx

/** @jsx h */
import { h } from "preact";

export default function Base(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>My Adonis website</title>
      </head>
      <body>{props.children}</body>
    </html>
  );
}
```

### Writing a page component

Now that you have a layout component, you can use it in any page component (the
component that will be rendered from your controllers):

```tsx
// app/Components/pages/Index.tsx

/** @jsx h */
import { h } from "preact";
import Base from '../layouts/Base';

export default function Index() {
  return (
    <Base>
      <div className="max-w-screen-xl mx-auto text-center py-16 px-8">
        <h2 className="font-extrabold tracking-tight text-gray-900 text-4xl leading-10">
          Hello from Adonis Preact!
        </h2>
      </div>
    </Base>
  );
}
```

### Rendering a component

#### In a route handler

```ts
// start/routes.ts

import Route from '@ioc:Adonis/Core/Route';

import Index from 'App/Components/pages/Index';

Route.get('/', async ({ preact }) => preact.render(Index));
```

#### In a controller

```ts
// app/Controllers/Http/MyController.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Index from 'App/Components/pages/Index';

export default class MyController {
  index({ preact }: HttpContextContract) {
    return preact.render(Index);
  }
}
```

### Passing props to the rendered component

If the component you render expects props, they must be passed as a second
argument to the `render` method:

```tsx
// app/Components/pages/WithProps.tsx

/** @jsx h */
import { h } from "preact";
import Base from '../layouts/Base';

export default function WithProps(props: { name: string }) {
  return (
    <Base>
      <div className="max-w-screen-xl mx-auto text-center py-16 px-8">
        <h2 className="font-extrabold tracking-tight text-gray-900 text-4xl leading-10">
          Hello {props.name}!
        </h2>
      </div>
    </Base>
  );
}
```

```ts
// start/routes.ts

import Route from '@ioc:Adonis/Core/Route';

import Index from 'App/Components/pages/Index';

Route.get('/with-props', async ({ preact }) =>
  preact.render(WithProps, { name: 'my friend' }),
);
```

### Accessing the Adonis context from a component

Adonis Preact provides a hook to access the Adonis context and some helpers from
anywhere inside the component tree.

```tsx
// app/Components/pages/WithContext.tsx

import { useAdonisContext } from '@ioc:Preact';
/** @jsx h */
import { h } from "preact";
import Base from '../layouts/Base';

export default function WithContext(props: { name: string }) {
  const { request } = useAdonisContext();

  return (
    <Base>
      <div className="max-w-screen-xl mx-auto text-center py-16 px-8">
        <h2 className="font-extrabold tracking-tight text-gray-900 text-4xl leading-10">
          Hello from {request.url()}!
        </h2>
      </div>
    </Base>
  );
}

// start/routes.ts

import Route from '@ioc:Adonis/Core/Route';

import WithContext from 'App/Components/pages/WithContext';

Route.get('*', async ({ preact }) => preact.render(WithContext));
```

## License

- Based on adonis-react package

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/adonis-preact.svg
[npm-url]: https://www.npmjs.com/package/adonis-preact
[ci-image]: https://github.com/DonsWayo/adonis-preact/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/DonsWayo/adonis-preact/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/adonis-preact.svg
[download-url]: https://www.npmjs.com/package/adonis-preact
