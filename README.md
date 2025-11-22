# todos
- make logo clickable
- add prettier-jsdoc
- make the view-cart section's cart icon and money amount more aligned. it isn't.
- hide captions in logo in mobile.
- fix alignments in mobile view of cart page.
- make the logo caption text a component by itself. (currently it is causing the entire navbar component to re-render. also calling the usecartitems() hook endlessly.)
- perhaps add a no-empty-classname eslint rule?
- **big idea**: using breakpoint styling breakpoint `sm` instead of `md` seems to be an obvious change.
- ~~fix the big bug with separate useCartItems() hook instance not being in sync since updates to local storage dont trigger them to fetch new data from local storage.~~
  - i solved it without using useGlobalState() by doing the 'thing' i am so well in doing.
  - that is the '2nd layer' approach. 
  - so, i've made one function `setCartItems()` and i have renamed the useState variable to `_setCartItems()` and the `setCartItems` wrapper fetches new data from localstorage 
  every single time before invoking `_setCartItems()`.
  - this is indeed fun of a different extent to not require 'global' stuff.
- 20 nov EOD - now i should work on what next???
  - todo. this is yet to be found out.
  - inshallah, tomorrow i will 'continue from where i left off today'.

# `no-empty-classname` eslint rule

remove the classnames with an empty string from jsx elements. previously, i talked about adding a 'key' to list items produced by a loop. i might look into a custom impl of this later on inshallah.

## custom rule code

Here’s a minimal custom ESLint rule that flags empty `className` attributes in JSX. Drop this in your own plugin (e.g., `eslint-plugin-no-empty-classname/index.js`) and reference it from `.eslintrc`.

```js
// lib/rules/no-empty-classname.js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow empty className strings in JSX',
    },
    messages: {
      empty: 'Remove empty className; it has no effect.',
    },
    schema: [], // no options
    fixable: 'code',
  },

  create(context) {
    return {
      JSXAttribute(node) {
        if (
          node.name &&
          node.name.name === 'className' &&
          node.value &&
          node.value.type === 'Literal' &&
          typeof node.value.value === 'string' &&
          node.value.value.trim() === ''
        ) {
          context.report({
            node,
            messageId: 'empty',
            fix(fixer) {
              return fixer.remove(node);
            },
          });
        }
      },
    };
  },
}
```

Usage example:

```js
// eslint-plugin-no-empty-classname/index.js
module.exports = {
  rules: {
    'no-empty-classname': require('./lib/rules/no-empty-classname'),
  },
};
```

In `.eslintrc`:

```json
{
  "plugins": ["no-empty-classname"],
  "rules": {
    "no-empty-classname/no-empty-classname": "warn"
  }
}
```

This flags cases like `<div className="">` and auto-removes the attribute. You can extend the logic if you want it to catch template literals, expressions, etc.

## plug in the rule from a local file

In legacy `.eslintrc` (JSON/YAML) configs, ESLint loads rules only via plugins it can resolve on the Node module path (e.g., `eslint-plugin-foo`). So to use your custom rule there, you’d typically package it as a plugin (even if it’s just a local directory referenced with `npm link` or aliased in `package.json`).

If you want to point directly at a local file without publishing a plugin, switch to ESLint’s flat config (`eslint.config.js`). In that format you can `import` your rule file and register it inline:

```js
import noEmptyClassname from './eslint/rules/no-empty-classname.js';

export default [{
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    local: {
      rules: {
        'no-empty-classname': noEmptyClassname,
      },
    },
  },
  rules: {
    'local/no-empty-classname': 'warn',
  },
}];
```

So: `.eslintrc.json` can’t pull a rule straight from an arbitrary path; you either wrap it as a plugin or move to the flat config where you can import it directly.