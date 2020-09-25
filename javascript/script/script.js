// @ts-check
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  await prisma.comment.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.user.deleteMany({})

  // Create 2 users
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice McPeters',
      posts: {
        create: [
          {
            title: 'first post',
            published: true,
            content: 'welcome to my first post',
          },
          {
            title: 'second post',
            published: true,
            content: 'welcome to my second post',
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  })

  console.log('user1: ', user1)


  const user2 = await prisma.user.create({
    data: {
      email: 'shakuntala@prisma.io',
      name: 'Shakuntala Devi',
      posts: {
        create: {
          title: 'introduction to mind arithmetic',
          published: true,
          content: 'you will learn more about how to calculate in your mind',
        },
      },
      comments: {
        create: [
          {
            comment: 'interesting article',
            post: {
              connect: {
                id: user1.posts[1].id,
              },
            },
          },
        ],
      },
    },
  })


  // Retrieve all published posts
  const allPosts = await prisma.post.findMany({
    where: {published: true}
  })
  console.log(`Retrieved all published posts: `, allPosts)

  // Create a new post (written by an already existing user with email alice@prisma.io)
  const newPost = await prisma.post.create({
    data: {
      title: 'another interesting post',
      published: true,
      content: 'more soon...',
      author: {
        connect: {
          email: 'alice@prisma.io'
        }
      }
    }
  })
  console.log(`Created a new post: `, newPost)

  // Retrieve all posts by user with email alice@prisma.io (fluent API)
  const postsByUser = await prisma.user.findOne({
    where: {
      email: 'alice@prisma.io'
    }
  }).posts()
  console.log(`Retrieved all posts from a specific user: `, postsByUser)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
