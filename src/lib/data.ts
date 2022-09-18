import { merge } from "lodash";
import PublisherPlugin from "src/main";
import { DEFAULT_SETTINGS } from "./settings";
import { PlatformName, PlatformUnion, PublishedArticle, PublisherData } from "./types";


export const DEFAULT_DATA: PublisherData = {
  settings: DEFAULT_SETTINGS,
  articles: {}
}

/**
 * Abstraction layer for handling all app data.
 * 
 * Provides easy access to settings for other modules that need it. Settings themselves are not handled here. Data just takes care of saving them
 * 
 * Provides methods for storing metadata needed for article publishing and updating.
 */
// A fuckin great name
export default class Data {
  private data: PublisherData
  private plugin: PublisherPlugin

  constructor(plugin: PublisherPlugin) {
    this.plugin = plugin;
  }

  get settings() {
    return this.data.settings;
  }

  get platforms(): PlatformUnion[] {    
    const platforms: PlatformUnion[] = []
    for (const [name, options] of Object.entries(this.settings.publishers)) {
      if (options.enabled && options.apiKey) {
        platforms.push({
          apiKey: options.apiKey, name: name as PlatformName
        })
      }
    }
    return platforms;
  }

  async loadData() {
    this.data = merge(DEFAULT_DATA, await this.plugin.loadData());
  }

  async saveData() {
    await this.plugin.saveData(this.data);
  }
  
  createArticle(id: string, data: Omit<PublishedArticle, 'id'>) {
    this.data.articles[id] = { ...data, id }

    this.saveData() // PSA Remember to do this
    return data
  }

  // updateArticle() {}
  // deleteArticle() {}
}
