import { API_URL, PUBLISH_ID_FIELD } from "./constants";
import axios from 'axios'
import { getFileData, updateCurrentFrontmatter } from "./obsidianHelpers";
import PublisherPlugin from "src/main";
import { getPlatforms } from "./settings";
import { Body, Response } from "./types";
import { v4 } from 'uuid'
import { Notice } from "obsidian";

export default class Publisher {
  constructor(
    private plugin: PublisherPlugin,
  ) {}

  async publish() {
    const id = v4()
    const md = await updateCurrentFrontmatter({ [PUBLISH_ID_FIELD]: id })
    
    const data = getFileData();
    const platform = getPlatforms(this.plugin.settings)
    if (data) {
      const body: Body = {
        id,
        platform,
        article: {
          body_markdown: md,
          title: data.displayText,
          // TODO frontmatter for preprocessing stuff like
        },
      }
      
      const response = await axios.post<Response>(API_URL, body);
      if (response.data) {
        console.log('API post response', response.data);
        const platforms = Object.keys(response.data.platforms)
        new Notice(`Published to ${JSON.stringify(platforms)}`)
      }
    }

  }
}