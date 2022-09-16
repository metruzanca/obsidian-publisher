import { Command, Editor } from "obsidian";
import { COMMAND_PREFIX } from "./constants";
import Publisher from "./publisher";

const commands: Command[] = [{
  id: `${COMMAND_PREFIX}-publish-current-note`,
  name: 'Publish current note',
  async editorCallback(editor: Editor) {
    const pub = new Publisher(editor);
    await pub.publish();
  }
}]

export default commands;