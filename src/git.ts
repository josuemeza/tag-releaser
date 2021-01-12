import { exec } from "./utils"

export interface Commit {
  key: string
  message: string
}

export const currentCommit = async (): Promise<Commit> => {
  const { stdout, stderr } = await exec("git log --oneline | head -n 1")
  if(stderr) throw new Error(stderr)
  const [ key, ...line ] = stdout.split(" ")
  const message = line.join(" ").trim()
  return { key, message }
}

export const pushTag = async (tag: string, message: string) => {
  console.log("\nGit output:\n")
  const { stdout: tagOut, stderr: tagError } = await exec(`git tag -a ${tag} -m "${message}"`)
  console.log(`${tagOut}\n${tagError}`)
  const { stdout: pushOut, stderr: pushError } = await exec(`git push origin ${tag}`)
  console.log(`${pushOut}\n${pushError}`)
}