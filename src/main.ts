import { addIcon, Plugin } from 'obsidian';
import PublisherSettingTab from './lib/settings';
import { icons } from 'feather-icons';
import Publisher from './lib/publisher';
import { COMMANDS } from './lib/constants';
import { obsidianConsoleApi } from './lib/dev';
import Data from './lib/data';

const publishRibbonIcon = icons["upload"].toSvg({ width: 100, height: 100 });

export default class PublisherPlugin extends Plugin {
  db: Data;

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
    this.db = new Data(this);
    await this.db.loadData()
		// await this.loadSettings();
		this.addSettingTab(new PublisherSettingTab(this.app, this));
    this.initRibbon();
		this.initCommands();
    await obsidianConsoleApi();
	}

	// onunload() {}
}
