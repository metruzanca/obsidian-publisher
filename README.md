# Obsidian Publisher

Publish Markdown to various blogging platforms.
<!-- In the future, change "various" to "any" -->

Publisher adds the ability to "publish" any note, this will send the markdown to the [Publisher backend](github.com/metruzanca/markdown-publisher-service/) for preprocessing and subsequently post the note to configured platforms, such as:
* [Dev.To](https://dev.to/)
* [medium](https://medium.com/)
* [hashnode.com](https://hashnode.com/)
* [telegra.ph](https://telegra.ph)
* git
  * Which enables github pages, or other static site generators e.g. https://blot.im/, https://gohugo.io/ or custom built gatsbyjs or sveltekit apps.
* [Ghost](https://ghost.org/)
* More to come...

Note: _No account is needed and the publisher backend doesn't store any submitted information such as api keys / credentials used for publishing._

## ToDo List

This plugin is just starting development, so I'll be keeping a basic ToDo list here.

- [ ] Figure out how to send the obsidian note to the backend.
- [ ] Support publishing to these platforms:
  (_I'm guessing these have the best APIs for doing this sort of thing_)
  - [ ] Devto
    - [ ] Basic publishing
    - [ ] Editing
  - [ ] Hashnode
  - [ ] Git
- [ ] Support other popular platforms
  (_These on the other hand will probably take a bit more to get working_)
  - [ ] telegra.ph
  - [ ] medium
  - [ ] Ghost
- [ ] Image support. (if I can't upload images to given publisher, use imgur instead)

> _This ToDo list does not include all the work that needs to be done on the [Backend](github.com/metruzanca/markdown-publisher-service/). This todolist is mainly for visibility/transparency when I decide to publish the plugin to obsidian._

## Credits
Used [lynchjames's obsidian-day-planner](https://github.com/lynchjames/obsidian-day-planner) as a reference for getting svelte setup properly. (_Not sure if I'd use svelte much, but I'd like to have it available to me_) The pre-made rollup also gives me other developer ergonomics such as a src and dist directory. I've also snagged him nice release workflow. Definitely saved me some time getting started.

## Development

[Kanban Board](https://github.com/users/metruzanca/projects/7)

---

TODO delete this later

<details>
<summary>Obsidian Base Plugin Readme</summary>

# Obsidian Sample Plugin

This is a sample plugin for Obsidian (https://obsidian.md).

This project uses Typescript to provide type checking and documentation.
The repo depends on the latest plugin API (obsidian.d.ts) in Typescript Definition format, which contains TSDoc comments describing what it does.

**Note:** The Obsidian API is still in early alpha and is subject to change at any time!

This sample plugin demonstrates some of the basic functionality the plugin API can do.
- Changes the default font color to red using `styles.css`.
- Adds a ribbon icon, which shows a Notice when clicked.
- Adds a command "Open Sample Modal" which opens a Modal.
- Adds a plugin setting tab to the settings page.
- Registers a global click event and output 'click' to the console.
- Registers a global interval which logs 'setInterval' to the console.

## First time developing plugins?

Quick starting guide for new plugin devs:

- Check if [someone already developed a plugin for what you want](https://obsidian.md/plugins)! There might be an existing plugin similar enough that you can partner up with.
- Make a copy of this repo as a template with the "Use this template" button (login to GitHub if you don't see it).
- Clone your repo to a local development folder. For convenience, you can place this folder in your `.obsidian/plugins/your-plugin-name` folder.
- Install NodeJS, then run `npm i` in the command line under your repo folder.
- Run `npm run dev` to compile your plugin from `main.ts` to `main.js`.
- Make changes to `main.ts` (or create new `.ts` files). Those changes should be automatically compiled into `main.js`.
- Reload Obsidian to load the new version of your plugin.
- Enable plugin in settings window.
- For updates to the Obsidian API run `npm update` in the command line under your repo folder.

## Releasing new releases

- Update your `manifest.json` with your new version number, such as `1.0.1`, and the minimum Obsidian version required for your latest release.
- Update your `versions.json` file with `"new-plugin-version": "minimum-obsidian-version"` so older versions of Obsidian can download an older version of your plugin that's compatible.
- Create new GitHub release using your new version number as the "Tag version". Use the exact version number, don't include a prefix `v`. See here for an example: https://github.com/obsidianmd/obsidian-sample-plugin/releases
- Upload the files `manifest.json`, `main.js`, `styles.css` as binary attachments. Note: The manifest.json file must be in two places, first the root path of your repository and also in the release.
- Publish the release.

> You can simplify the version bump process by running `npm version patch`, `npm version minor` or `npm version major` after updating `minAppVersion` manually in `manifest.json`.
> The command will bump version in `manifest.json` and `package.json`, and add the entry for the new version to `versions.json`

## Adding your plugin to the community plugin list

- Check https://github.com/obsidianmd/obsidian-releases/blob/master/plugin-review.md
- Publish an initial version.
- Make sure you have a `README.md` file in the root of your repo.
- Make a pull request at https://github.com/obsidianmd/obsidian-releases to add your plugin.


## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

## Improve code quality with eslint (optional)
- [ESLint](https://eslint.org/) is a tool that analyzes your code to quickly find problems. You can run ESLint against your plugin to find common bugs and ways to improve your code. 
- To use eslint with this project, make sure to install eslint from terminal:
  - `npm install -g eslint`
- To use eslint to analyze this project use this command:
  - `eslint main.ts`
  - eslint will then create a report with suggestions for code improvement by file and line number.
- If your source code is in a folder, such as `src`, you can use eslint with this command to analyze all files in that folder:
  - `eslint .\src\`


## API Documentation

See https://github.com/obsidianmd/obsidian-api

</details>