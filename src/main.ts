import { addIcon, Plugin, WorkspaceLeaf } from 'obsidian';
import PublisherSettingTab from './lib/settings';
import { icons } from 'feather-icons';
import Publisher from './lib/publisher';
import { COMMANDS, ICONS } from './lib/constants';
import { obsidianConsoleApi } from './lib/dev';
import Data from './lib/data';
import { DynamicIcon, getFrontmatter, SubEvents } from './lib/obsidianHelpers';

// /Users/szanca/dev/obsidian-publisher/node_modules/feather-icons/dist/icons
const publishIcon = icons["upload"].toSvg({ width: 100, height: 100 });
const saveIcon = icons["save"].toSvg({ width: 100, height: 100 });

export default class PublisherPlugin extends Plugin {
  db: Data;

  initCommands() {
    this.addCommand({
      ...COMMANDS.PUBLISH_CURRENT,
      async callback() {
        const pub = new Publisher(this);
        await pub.publish();
      }
    });
  }

  events: SubEvents<typeof app.workspace>

  activeId?: string;

  handleIcons() {
    DynamicIcon.setPlugin(this);
    DynamicIcon.addIcons([
      [ICONS.PUBLISH, publishIcon],
      [ICONS.SAVE, saveIcon], // This icon is added, but is not currently being used when swapping.
    ]);
    this.publishIcon = new DynamicIcon('publish', 'Publish', async () => {
      const pub = new Publisher(this);
      await pub.publish();
    })

    this.events.subscribe('active-leaf-change', (e: WorkspaceLeaf | null) => {
      if (e && e.view?.getViewType() === 'markdown') {
        switch (getFrontmatter()?.publisher_id) {
          case undefined:
            this.publishIcon.setIcon(publishIcon, 'Publish')
            break
          default:
            this.publishIcon.setIcon(saveIcon, 'Save')
            break
        }
      }
    })
  }

  replaceIcon(iconEl: HTMLElement, icon: string, label: string) {
    iconEl.children[0].remove()
    iconEl.innerHTML = icon
    iconEl.children[0].setAttr('width', 18)
    iconEl.children[0].setAttr('height', 18)
    iconEl.ariaLabel = label
  }

  publishIcon: DynamicIcon;

	async onload() {
    this.db = new Data(this);
    await this.db.loadData()
		this.addSettingTab(new PublisherSettingTab(this.app, this));

		this.initCommands();
    await obsidianConsoleApi();
    
    this.events = new SubEvents(app.workspace);
    this.handleIcons();

	}

	// onunload() {}
}
