import crypto from 'crypto'
export const Password = (data: { pwd: string; salt: string }) => {
  const { pwd, salt } = data
  const password = crypto
    .createHash('sha512')
    .update(pwd + salt)
    .digest('hex')
  return password
}

export const CreateSalt = () => {
  const salt = Math.round(new Date().valueOf() + Math.random()) + ''
  return salt
}
