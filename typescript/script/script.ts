import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  // log: ['query']
})

// A `main` function so that we can use async/await
async function main() {
  await prisma.userRatings.deleteMany()
  await prisma.user.deleteMany()
  // Seed the database with users and posts
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      ratings: {
        create: [
          {
            rating: 10,
          },
          {
            rating: 6,
          },
          {
            rating: 8,
          },
          {
            rating: 6,
          },
        ],
      },
    },
  })
  const user2 = await prisma.user.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      ratings: {
        create: [
          {
            rating: 4,
          },
          {
            rating: 6,
          },
          {
            rating: 2,
          },
        ],
      },
    },
  })


  const avgUserRatings = await prisma.userRatings.groupBy({
    by: ['userId'],
    avg: {
      rating: true,
    },
    orderBy: {
      _avg: {
        rating: 'desc'
      }
    },
  })
  console.log(avgUserRatings)

  const userRatingsCount = await prisma.userRatings.groupBy({
    by: ['userId'],
    count: {
      rating: true
    },
    orderBy: {
      _count: {
        userId: 'desc',
      },
    },
  })
  console.log(userRatingsCount)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
