import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Order by Relation')

  const postsByAuthor = await prisma.post.findMany({
    orderBy: {
      author: {
        name: 'asc',
      },
    },
    include: {
      author: true,
    },
  })
  console.log(`Posts ordered by their author's name`, postsByAuthor)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
