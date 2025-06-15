# Shopping Bird

> An offline first shopping list app that syncs with google keep.

This app exists to solve the following use cases:

- Synchronize with a Google Keep shopping list, so that the list can be edited with voice through Google Assistant.
- Offline first, so that it works flawlessly in stores where reception is bad.
- Realtime sync, so that several people can see the same shopping list from multiple devices and have the same state of the list with very low delay (when the network allows).

It is built with the following stack

- Frontend: [Solid.js](https://www.solidjs.com/) on [Vite](https://vite.dev/) with [Tailwind](https://tailwindcss.com/)
- Backend: [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
- Sync: [Triplit](https://www.triplit.dev/)
