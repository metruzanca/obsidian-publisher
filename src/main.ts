import { addIcon, Plugin } from 'obsidian';
import SampleSettingTab, { DEFAULT_SETTINGS } from './lib/settings';
import { icons } from 'feather-icons';
import Publisher from './lib/publisher';
import { COMMANDS } from './lib/constants';
import { PublisherSettings } from './lib/types';
//TODO check if the bundle is only including merge or if I'm gonna need to use lodash.merge module
import { merge } from 'lodash'
import { obsidianConsoleApi } from './lib/dev';

const publishRibbonIcon = icons["upload"].toSvg({ width: 100, height: 100 });

export default class PublisherPlugin extends Plugin {
	settings: PublisherSettings;

  initRibbon() {
    addIcon('publish', publishRibbonIcon);
    this.addRibbonIcon('publish', 'Publish', async (evt: MouseEvent) => {
      const pub = new Publisher(this);
      await pub.publish();
    });
  }

  initCommands() {
    this.addCommand({
      ...COMMANDS.PUBLISH_CURRENT,
      async callback() {
        const pub = new Publisher(this);
        await pub.publish();
      }
    });
  }

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SampleSettingTab(this.app, this));
    this.initRibbon();
		this.initCommands();
    await obsidianConsoleApi();
	}

	// onunload() {}

	async loadSettings() {
    // Lodash's merge will deeply merge objects, allowing for more complex state and defaults still applying properly
    this.settings = merge(DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
