import { merge } from "lodash";
import { parseYaml, stringifyYaml } from "obsidian";

const yamlBlockPattern = /^(?:---)(.*?)(?:---|\.\.\.)/s;

export function getYaml(fileText: string): object | undefined {
  const result = yamlBlockPattern.exec(fileText.trim());
  const yaml = result?.[1] // 0 includes ---. 1 does not.
  if (yaml) {
    return parseYaml(yaml);
  }
}

function wrapYamlDashes(yaml: string) {
  return '---\n'.concat(yaml, '---\n')
}

export function updateYaml(fileText: string, yaml: object) {
  const currentYaml = getYaml(fileText);
  if (currentYaml) {
    const mergedYaml = merge(currentYaml, yaml)
    return fileText.replace(yamlBlockPattern, wrapYamlDashes(stringifyYaml(mergedYaml)))
  }
  // Case where frontmatter doesn't exist yet
  return wrapYamlDashes(stringifyYaml(yaml)).concat(fileText.trim())
}
