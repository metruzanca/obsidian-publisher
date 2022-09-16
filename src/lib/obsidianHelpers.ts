import { Editor, MarkdownView } from "obsidian";
import { updateYaml } from "./yaml";

// See https://github.com/obsidianmd/obsidian-releases/blob/master/plugin-review.md#avoid-accessing-workspaceactiveleaf-directly
export function getEditor(): Editor | undefined {
  const view = app.workspace.getActiveViewOfType(MarkdownView);
  return view?.editor;
}

export function getFileData() {
  const view = app.workspace.getActiveViewOfType(MarkdownView);  
  const markdown = view?.data;
  const displayText = view?.getDisplayText();
  if (markdown && displayText) {
    return { markdown, displayText };
  }
}

/** Might not be most recent version in some instances */
export function getFrontmatter() {
  const view = app.workspace.getActiveViewOfType(MarkdownView);
  
  if (view?.file.path) {
    const file = app.metadataCache.getFileCache(view?.file)
    return file?.frontmatter
  }
}

export async function updateFrontmatter(normalizedPath: string, yaml: object) {
  const currentMd = await app.vault.adapter.read(normalizedPath)
  const newMd = updateYaml(currentMd, yaml);
  await app.vault.adapter.write(normalizedPath, newMd)
}

export async function updateCurrentFrontmatter(yaml: object) {
  const view = app.workspace.getActiveViewOfType(MarkdownView);
  if (view?.file) {
    return await updateFrontmatter(view.file.path, yaml)
  } else {
    throw new Error('No Editor open')
  }
}