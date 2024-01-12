# slam-electron-template

Slam's Typescript-enabled Electron-React Desktop Template

Some important packages are listed as follows:
- [Electron Forge](https://www.electronforge.io/) (App Packager)
- [ESLint](https://eslint.org/)
- [Google Material Icons](https://www.npmjs.com/package/@material-design-icons/svg)
- [React Redux](https://react-redux.js.org/)
- [React Router DOM](https://reactrouter.com/en/main/start/overview)
- [Sass](https://sass-lang.com/)
- [Webpack.js](https://webpack.js.org/)

Template Features:
- Custom-built logging system (for both Main & Renderer Processes)
- [UNFINISHED] Custom SCSS Bootstrap *(based from this [repo](https://github.com/SlamTheDragon/SlamTheDragon.github.io))*
- [UNFINISHED] Custom keybinding system
- [UNFINISHED] Electron IPC-Dictionary system (needs to be refactored)
- [UNFINISHED] Config Loader
- [UNFINISHED] Custom Modal System
- Custom Buttons

> *Side Note:* this repository will be continually updated based on Slam's experiences and things he has implemented on other applications that are great for this repository's template setup.

## Development

Download dependencies with `yarn i` or `npm i`. Package manager [pnpm](https://pnpm.io/) will not work due to how [electron-forge](https://www.electronforge.io/) is designed.

Some important notes to consider:
- Electron files are located at `src/utils/electron`.
- Main React Interface is located at `src/pages/Home/Home.tsx`

## Scripts

A default launch.json is provided for debugging.

Here are some available scripts useful for development:

- start development environment
```bash
$ npm start
```

- package for source code & release
```bash
$ npm run publish
or
$ npm run package
```

- check for errors with [ESlint](https://eslint.org/)
```bash
$ npm run lint
```

### Personal Notes

Some future goals:
- Implement majority of Electron.js's API
- Continue working on [SlamTheDragon/docking-panels-test](https://github.com/SlamTheDragon/docking-panels-test), would make a great base repository template for an electron-powered editing application (Similar to [Blockbench](https://github.com/JannisX11/blockbench))