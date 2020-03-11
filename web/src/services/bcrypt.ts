import bcrypt from 'bcrypt'

export default {
  generate(data: string) {
    return new Promise<string>(async function(resolve, erro) {
      const salt = await bcrypt.genSalt(10)
      const hashData = await bcrypt.hash(data, salt)
      resolve(hashData)
    })
  },
  compare(data: string, dataHash: string) {
    return new Promise<boolean>(async function(resolve, erro) {
      const r = await bcrypt.compare(data, dataHash)
      resolve(r)
    })
  }
}
