import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  const usersWithPostCount = await prisma.user.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    where: {
      posts: {
        none: {
          published: false,
        },
      },
    },
    // combined with order by Relation
    // orderBy: {
    //   posts: {
    //     _count: 'desc',
    //   },
    // },
  })

  console.log('Select relation count')
  console.log('Users with post count', usersWithPostCount)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
