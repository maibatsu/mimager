# Mimager

Mirage JS IdentityManager for Mocking GUIDs.

`Mimager` is a custom IdentityManager for Mirage JS. It generates Nano ID
strings instead of default numeric IDs.

Use it when a mocked API should return GUID, UUID, or random string IDs.

## Why Nano ID

`Mimager` uses Nano ID for ID generation:

- No runtime dependencies in Nano ID.
- 118 bytes, minified and brotlied.
- Cryptographic random values by default.
- URL-friendly IDs.
- 21 characters by default, with collision probability close to UUID v4.

See the [Nano ID README](https://github.com/ai/nanoid#readme) for details.

## Requirements

Node.js `^18 || >=20`.

## Usage

Configure `Mimager` as the application identity manager:

```js
import { createServer, Model } from 'miragejs'
import { Mimager } from 'mimager'

createServer({
  identityManagers: {
    application: Mimager,
  },

  models: {
    user: Model,
  },
})
```

## API

### `fetch()`

Returns an unused ID and marks it as used.

```js
const id = ids.fetch()
```

### `set(id)`

Marks an ID as used.

Throws if the ID was already used.

```js
ids.set('user_1')
```

### `checkId(id)`

Returns `true` if the ID is already used.

This helper is outside the IdentityManager contract.

```js
ids.checkId('user_1')
```

### `reset()`

Clears all tracked IDs.

```js
ids.reset()
```

## IdentityManager contract

`Mimager` follows the IdentityManager contract.

See the official [IdentityManager documentation](https://miragejs.com/api/classes/identity-manager/)
for details.

## License

MIT
