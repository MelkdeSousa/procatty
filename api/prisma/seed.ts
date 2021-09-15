import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

dotenv.config({ path: '../.env' })

const { admin, $disconnect } = new PrismaClient()

async function seed () {
  const salt = Number(process.env.SALT_HASH)

  const email = String(process.env.SEED_ADMIN_EMAIL)
  const name = String(process.env.SEED_ADMIN_NAME)
  const username = String(process.env.SEED_ADMIN_USERNAME)
  const password = await hash(String(process.env.SEED_ADMIN_PASSWORD), salt)

  await admin.create({
    data: {
      email,
      name,
      username,
      password,
    },
  })
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await $disconnect()
  })
