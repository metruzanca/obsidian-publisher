import { API_URL } from "./constants";
import axios from 'axios'
import { getFileData, updateCurrentFrontmatter } from "./obsidianHelpers";
import PublisherPlugin from "src/main";
import { getPlatforms } from "./settings";
import { Body, Response } from "./types";


export default class Publisher {
  constructor(
    private plugin: PublisherPlugin,
  ) {}

  async publish() {
    const data = getFileData();
    const platform = getPlatforms(this.plugin.settings)
    if (data) {
      console.log('Posting to ', API_URL);
      const body: Body = {
        platform,
        article: {
          body_markdown: data.markdown,
          title: data.displayText,
          // TODO frontmatter for preprocessing stuff like
        },
      }

      const response = await axios.post<Response>(API_URL, body);
      if (response.data) {
        console.log('API post response', response.data);
        await updateCurrentFrontmatter({ id: response.data.id })
      }
    }

  }
}