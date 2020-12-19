import { match } from "assert"
import * as fs from "fs"

export interface Action {
  name: string,
  changes: string[]
}

interface Version {
  key: string
  date: string
  actions: Action[]
}

export const readLastVersion = (): Version => {
  const regex = {
    version: /^## (?:\[)(\d*.\d*.\d*)(?:\]) - (\d{4}-\d{2}-\d{2})/i,
    action: /^### (Added|Changed|Deprecated|Removed|Fixed|Security)/i,
    change: /^- (.*)/i
  }
  const lines = fs
    .readFileSync("CHANGELOG.md", "utf8")
    .split("\n")
    .filter(Boolean)

  let lastVersion: Version | null = null
  let currentAction: Action | null = null
  for(const line of lines) {
    if(lastVersion) {
      if(regex.version.test(line))
        break
      if (currentAction) {
        if (regex.change.test(line)) {
          const match = line.match(regex.change)
          if (match) {
            const [ _, change ] = match
            currentAction.changes.push(change)
          }
        }
      } else if(regex.action.test(line)) {
        if(currentAction) {
          lastVersion.actions.push(currentAction)
        }
        const match = line.match(regex.action)
        if (match) {
          const [ _, name ] = match
          currentAction = { name, changes: [] }
        }
      } 
    } else if(regex.version.test(line)) {
      const match = line.match(regex.version)
      if (match) {
        const [ _, version, date ] = match
        lastVersion = { key: version, date, actions: [] }
      }
    }
  }
  if (lastVersion && currentAction) {
    lastVersion.actions.push(currentAction)
  }
  if (!lastVersion)
    throw new Error("Error matching version of changelog file")
  return lastVersion
}