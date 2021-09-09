import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      city: 'Berlin',
      name: 'Alice',
      posts: {
        create: {
          title: 'Watch the talks from Prisma Day 2019',
          content: 'https://www.prisma.io/blog/z11sg6ipb3i1/',
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  })
  const user2 = await prisma.user.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      city: 'London',
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma/',
            published: false,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  })
  const user3 = await prisma.user.create({
    data: {
      email: 'conny@prisma.io',
      city: 'Berlin',
      name: 'Conny',
      posts: {
        create: [
          {
            title: 'TikTok for Millenials',
            content: 'https://tiktok.com/',
            published: true,
          },
          {
            title: 'YouTube for Millenials',
            content: 'https://www.youtube.com/',
            published: false,
          },
          {
            title: 'Instagram for Millenials',
            content: 'https://www.instagram.com/',
            published: false,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  })
  console.log(
    `Created users: ${user1.name} (${user1.posts.length} post) and ${user2.name} (${user2.posts.length} posts) and ${user3.name} (${user3.posts.length} posts)`,
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
