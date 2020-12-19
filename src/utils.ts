import util from "util"
import { createInterface } from "readline"

export const question = (message: string) => {
  return new Promise<string>(resolve => {
    const readlineInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    readlineInterface.question(message, answer => {
      resolve(answer)
      readlineInterface.close()
    })
  })
}

export const exec = util.promisify(require("child_process").exec)