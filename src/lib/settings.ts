import { App, PluginSettingTab, Setting } from "obsidian";
import PublisherPlugin from "src/main";
import { PlatformUnion, PlatformName, PublisherSettings, CanonicalSource } from "./types";

type AddPublisherOptions = {
  name: PlatformName
  createTokenUrl: string
}

export const DEFAULT_SETTINGS: PublisherSettings = {
  canonicalSource: CanonicalSource.None,
  publishers: {
    DevTo: {
      enabled: false,
    },
    HashNode: {
      enabled: false,
    },
    Medium: {
      enabled: false,
    }
  }
}


export default class SampleSettingTab extends PluginSettingTab {
  plugin: PublisherPlugin;

  constructor(app: App, plugin: PublisherPlugin) {
    super(app, plugin);
    this.plugin = plugin;    
  }

  addSeparator(containerEl: HTMLElement) {
    const d1 = containerEl.createEl('div')
    d1.style.margin = '2em'
  }

  addPublisher(containerEl: HTMLElement, options: AddPublisherOptions) {
    const d1 = containerEl.createEl('h4', { text: `${options.name} settings` })
    d1.style.marginTop = '2em'
    
    new Setting(containerEl)
      .setName(`Enable posting to ${options.name}`)
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.publishers[options.name].enabled)
        .onChange(async state => {
          this.plugin.settings.publishers[options.name].enabled = state;
          await this.plugin.saveSettings();
        }))

    // TODO figure out how I can hide the api-key fields using <input type="password"/>
    new Setting(containerEl)
      .setName(`${options.name} Api-Key`)
      // TODO get this link in here to be clickable
      .setDesc(`Create one here: ${options.createTokenUrl}`)
      .addText(text => text
        .setPlaceholder('api-key')
        .setValue(this.plugin.settings.publishers[options.name].apiKey || '')
        .onChange(async (value) => {
          this.plugin.settings.publishers[options.name].apiKey = value;
          await this.plugin.saveSettings();
        }))
      // TODO figure out how to disable the input
      // .setDisabled(!this.plugin.settings.publishers[options.name].enabled)
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h3', { text: 'Publisher settings' });
    
    new Setting(containerEl)
      .setName('canonical Platform')
      .setDesc(`Do you have a "main blog" that you'd like all other blogs to link to?`)
      .addDropdown(drop => drop
        .addOption(CanonicalSource.None, CanonicalSource.None)
        .addOptions(getEnabledPlatforms(this.plugin.settings.publishers))
        .onChange(async value => {
          this.plugin.settings.canonicalSource = value as CanonicalSource;
          await this.plugin.saveSettings()
        })
        .setValue(this.plugin.settings.canonicalSource)
      )
      

    this.addPublisher(containerEl, {
      name: PlatformName.DevTo,
      createTokenUrl: 'https://dev.to/settings/extensions'
    })

    // TODO Hashnode requires gql, I'll do that later. 

    // this.addSeparator(containerEl);

    // this.addPublisher(containerEl, {
    //   name: PlatformName.HashNode,
    //   createTokenUrl: 'https://hashnode.com/settings/developer'
    // })

    // this.addSeparator(containerEl);

    this.addPublisher(containerEl, {
      name: PlatformName.Medium,
      createTokenUrl: 'https://medium.com/me/settings'
    })
  }
}

function getEnabledPlatforms(publishers: PublisherSettings['publishers']) {
  const options: Record<string, string> = {}
  for (const [platformName, settings] of Object.entries(publishers)) {
    if (settings.enabled) {
      options[platformName] = platformName;
    }
  }
  return options;
}

export function getPlatforms(settings: PublisherSettings): PlatformUnion[] {
  const publishers: PlatformUnion[] = []
  for (const [name, options] of Object.entries(settings.publishers)) {
    if (options.enabled && options.apiKey) {
      publishers.push({
        apiKey: options.apiKey, name: name as PlatformName
      })
    }
  }
  return publishers;
}