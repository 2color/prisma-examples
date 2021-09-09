import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  console.log(
    'Order by Relation',
    await prisma.post.findMany({
      orderBy: {
        author: {
          name: 'asc',
        },
      },
      include: {
        author: true,
      },
    }),
  )

  console.log(
    'Order by Aggregate in Group By',
    await prisma.user.groupBy({
      by: ['city'],
      _count: {
        city: true,
      },
      orderBy: {
        _count: {
          city: 'desc',
        },
      },
    }),
  )

  console.log(
    'Select relation count',
    await prisma.user.findMany({
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
      // Order by Relation combined
      // orderBy: {
      //   posts: {
      //     _count: 'desc',
      //   },
      // },
    }),
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
