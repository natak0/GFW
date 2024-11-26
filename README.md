# GFW frontend code challenge

Hi👋! First of all, thanks for taking the time to do this.

## Overview

Our main [app](https://globalfishingwatch.org/map) maintains a large and complex state between its components and the URL, so we would like to know your approach to synchronizing the state between them.

## Main Objective

Sync the state of the `"Presence"` and `"Satellite"` [switches](src/components/Sidebar.tsx) in the sidebar with the URL to ensure changes are reflected on the visibility in the [Map](src/components/Main.tsx) for

- The [Heatmap layer](src/layers/FourwingsHeatmapTileLayer.ts)
- The [Satellite layer](src/layers/SatelliteLayer.ts)

### Requisites

- The cleaner url, the better
- Refreshing the page should maintain the state

## Extra Objective

Please don't spend too much time here, and don't write any code!
We just want something to start the conversation in the following interview.

We've developed a custom layer in Deck called [`FourwingsHeatmapTileLayer`](src/layers/FourwingsHeatmapTileLayer.ts) to render aggregated temporal data.
Could you take a look and share your thoughts about your approach to improving the rendering performance?

## Submission guidelines

Feel free to push your code to any public/private repo or send a zipped version to this [email](joseangel@globalfishingwatch.org)

If you prefer a private repo for privacy reasons, please include the `j8seangel` user in Git Hub or GitLab.

## Project setup

To run the project, follow these steps:

Install the dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

Open your browser and navigate to <http://localhost:5173/> to see the application running.

Have fun, and see you soon!

