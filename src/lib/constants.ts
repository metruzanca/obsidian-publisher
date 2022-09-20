export const COMMAND_PREFIX = 'publisher'; // If pluginName ever changes, change this
export const API_URL = process.env.NODE_ENV === "development"
? 'http://localhost:5173/api/'
: 'http://markdown-publisher-service.vercel.app/api/';

export const PUBLISH_ID_FIELD = `${COMMAND_PREFIX}_id`

export const COMMANDS = {
  PUBLISH_CURRENT: {
    id: `${COMMAND_PREFIX}-publish-current-note`,
    name: 'Publish current note',
  }
}

export namespace ICONS {
  export const SAVE = 'save'
  export const PUBLISH = 'publish'
}