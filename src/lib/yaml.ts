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
  return '---\n'.concat(yaml, '---')
}

export function updateYaml(fileText: string, yaml: object) {
  const currentYaml = getYaml(fileText);
  const mergedYaml = merge(currentYaml, yaml)
  
  const result = fileText.replace(yamlBlockPattern, wrapYamlDashes(stringifyYaml(mergedYaml)))
  return result;
}
