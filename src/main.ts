import { addIcon, Command, Editor, MarkdownView, Notice, Plugin } from 'obsidian';
import SampleModal from './lib/publishModal';
import SampleSettingTab from './lib/settings';
import { icons } from 'feather-icons';
import commands from './lib/commands';
import Publisher from './lib/publisher';

const publishRibbonIcon = icons["upload"].toSvg({ width: 100, height: 100 });

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class PublisherPlugin extends Plugin {
	settings: MyPluginSettings;

  setupRibbon() {
    addIcon('publish', publishRibbonIcon);

    const ribbonIconEl = this.addRibbonIcon('publish', 'Publish', async (evt: MouseEvent) => {
      // new Notice('This is a notice!');
      const editor = this.getEditor();
      if (editor) {
        const pub = new Publisher(editor);
        await pub.publish();
      }
    });
    // ribbonIconEl.addClass('my-plugin-ribbon-class');
  }


  getEditor(): Editor|null {
    const mdView = this.app.workspace.activeLeaf?.view as MarkdownView;
    return mdView?.editor || null;
  }

  loadCommands() {
    for (const cmd of commands) {
      this.addCommand(cmd);
    }
  }

	async onload() {
		await this.loadSettings();
    this.setupRibbon();
		this.loadCommands();
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {}

	async loadSettings() {
		this.settings = {
      ...DEFAULT_SETTINGS,
      ...await this.loadData()
    }
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
