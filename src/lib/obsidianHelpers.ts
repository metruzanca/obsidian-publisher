import { addIcon, Editor, Events, MarkdownView } from "obsidian";
import PublisherPlugin from "src/main";
import { AllIcons, ObsidianIcons } from "./icons";
import { updateYaml } from "./yaml";

// See https://github.com/obsidianmd/obsidian-releases/blob/master/plugin-review.md#avoid-accessing-workspaceactiveleaf-directly
export function getEditor(): Editor | undefined {
  const view = app.workspace.getActiveViewOfType(MarkdownView);
  return view?.editor;
}

export function getFileData() {
  const view = app.workspace.getActiveViewOfType(MarkdownView);  
  const markdown = view?.data;
  const displayText = view?.getDisplayText();
  if (markdown && displayText) {
    return { markdown, displayText };
  }
}

/** Might not be most recent version in some instances */
export function getFrontmatter() {
  const view = app.workspace.getActiveViewOfType(MarkdownView);
  
  if (view?.file.path) {
    const file = app.metadataCache.getFileCache(view?.file)
    return file?.frontmatter
  }
}

export async function updateFrontmatter(normalizedPath: string, yaml: object) {
  const currentMd = await app.vault.adapter.read(normalizedPath)
  const newMd = updateYaml(currentMd, yaml);
  await app.vault.adapter.write(normalizedPath, newMd)
  return newMd;
}

export async function updateCurrentFrontmatter(yaml: object) {
  const view = app.workspace.getActiveViewOfType(MarkdownView);
  if (view?.file) {
    return await updateFrontmatter(view.file.path, yaml)
  } else {
    throw new Error('No Editor open')
  }
}

// export function createSubscription(events: Events, event: string, callback: () => void) {
//   events.off('active-leaf-change', test)
//   app.workspace.on('active-leaf-change', test)
// }

// createSubscription(app.workspace, '', )

type Noop = () => void

// TODO not picking up all overloads of the on function. Just the last one. (remove any)
export class SubEvents<E extends Events> {
  callbacks: Record<string, Noop> = {}
  constructor(private events: E) {}

  subscribe(name: Parameters<E['on']>['0'] | string, callback: Parameters<E['on']>['1'] | any) {
    this.unsubscribe(name);
    this.callbacks[name] = callback;
    this.events.on(name, this.callbacks[name]);
    return () => this.unsubscribe(name);
  }

  unsubscribe(name: Parameters<E['off']>['0'] | string) {
    if (this.callbacks[name]) {
      this.events.off(name, this.callbacks[name]);
      delete this.callbacks[name];
    }
  }

  unsubscribeAll() {
    for (const [name, callback] of Object.entries(this.callbacks)) {
      this.events.off(name, callback);
      delete this.callbacks[name];
    }
  }

  async once(name: Parameters<E['on']>['0'] | string): Promise<Parameters<E['on']>['1']> {
    const events = this.events
    return new Promise(resolve => {
      function _once(e: Parameters<E['on']>['1']) {
        events.off(name, _once);
        resolve(e)
      }
      events.on(name, _once);
    })
  }
}

// TODO move to dynamicIcon
export class DynamicIcon {
  static plugin: PublisherPlugin
  static setPlugin(plugin: PublisherPlugin) {
    this.plugin = plugin;
  }
  static addIcons(icons: [string, string][]) {
    for (const icon of icons) {
      addIcon(...icon)
    }
  }
  iconEl: HTMLElement;
  constructor(icon: AllIcons, title: string, callback: (evt: MouseEvent) => any) {
    if (!DynamicIcon.plugin) {
      throw new Error('Run the static DynamicIcon.setPlugin before using this class')
    }
    this.iconEl = DynamicIcon.plugin.addRibbonIcon(icon, title, callback);
  }

  setIcon(icon: string, label: string) {
    this.iconEl.children[0].remove()
    this.iconEl.ariaLabel = label
    this.iconEl.innerHTML = icon // might be a better/safer way to do this.
    this.iconEl.children[0].setAttr('width', 18)
    this.iconEl.children[0].setAttr('height', 18)
  }

}
