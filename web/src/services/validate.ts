import { validate } from 'class-validator'

export default function(entity: any): Promise<any> {
  return new Promise(async (resolve, error) => {
    const errors = await validate(entity)
    if (errors.length > 0) {
      error(errors)
    }
    resolve()
  })
}
