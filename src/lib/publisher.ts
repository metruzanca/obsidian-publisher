import { API_URL, PUBLISH_ID_FIELD } from "./constants";
import axios from 'axios'
import { getFileData, updateCurrentFrontmatter } from "./obsidianHelpers";
import PublisherPlugin from "src/main";
import { Body, PlatformName, PlatformResponseStatus, Response } from "./types";
import { v4 } from 'uuid'
import { Notice } from "obsidian";
import { Logger } from "./dev";

export default class Publisher {
  constructor(
    private plugin: PublisherPlugin,
  ) {}

  async publish() {
    const id = v4()
    const md = await updateCurrentFrontmatter({ [PUBLISH_ID_FIELD]: id })
    
    const data = getFileData();
    const platform = this.plugin.db.platforms;
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
      const logger = new Logger('md Service');

      logger.add('POST body ', body)
      const response = await axios.post<Response>(API_URL, body);
      if (response.data) {
        logger.add('POST response ', response.data)
        const platforms = Object.keys(response.data.platforms)
        new Notice(`Published to ${JSON.stringify(platforms)}`)

        this.plugin.db.createArticle(id, {
          path:'', // TODO get obsidian path
          platforms: {
            DevTo: {
              // FIXME
              //@ts-ignore
              id: response.data.platforms[PlatformName.DevTo].id,
              //@ts-ignore
              publishedAt: response.data.platforms[PlatformName.DevTo].publishedAt,
              //@ts-ignore
              url: response.data.platforms[PlatformName.DevTo].url,
            }
          }
        })
      }
      logger.execute()
    }

  }
}