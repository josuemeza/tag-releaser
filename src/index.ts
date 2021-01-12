#!/usr/bin/env node
import { question } from "./utils"
import { Commit, currentCommit, pushTag } from "./git"
import { readLastVersion, Action } from "./parser"

const main = async () => {
  try {
    const { key: version, date, actions } = readLastVersion()
    const commit = await currentCommit()
    const confirm = await confirmation(version, date, actions, commit)
    if(confirm)
      await pushTag(confirm.tag, `Release ${confirm.tag}`)
  } catch(error) {
    console.error(`Fatal error: ${error.message}`)
  }
}

const confirmation = async (version: string, date: string, actions: Action[], commit: Commit) => {
  const tag = `release-${version}`
  const abstract = [
    "Release info:",
    `- Version: ${version}`,
    `- Date:    ${date}`,
    `- Tag:     ${tag}`,
    "\nCommit:",
    `- ID:      ${commit.key}`,
    `- Message: ${commit.message}`,
    "\nChanges:"
  ]
  for(const action of actions) {
    abstract.push(` + ${action.name}:`)
    for(const change of action.changes)
      abstract.push(`  - ${change}`)
  }

  const message = abstract.join("\n")
  const answer = await question(`${message}\n\nPush release? (y/n): `)
  if(answer.toLowerCase() === "y")
    return { tag }
}

main()