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
  await exec(`git tag -a ${tag} -m "${message}"`)
  await exec(`git push --tags`)
}