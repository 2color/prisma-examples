// @ts-check
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.comment.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.user.deleteMany({})

  // TODO: Create first user with two posts and include relation in response
  const user1 = await prisma.user.create({
    data: {
      email: 'simona@prisma.io',
      name: 'Simona',
      posts: {
        create: [{
          title: 'First post',
          content: 'Learn more about Serverless with Azure',
          published: true
        },
        {
          title: 'second post',
          content: 'learn more about testing serverless apps',
        }
        ]
      }
    },
    include: {
      posts: true
    }
  })
  console.log(user1)
  console.log('----------------------------------------')


  // TODO: Create second user with 1 post and add a comment to post from first user
  const user2 = await prisma.user.create({
    data: {
      name: 'Tomas',
      email: 'tomas@prisma.io',
      comments: {
        create: {
          comment: 'nice post',
          post: {
            connect: {
              id: user1.posts[0].id
            }
          }
        }
      }
    },
    include: {
      comments: true
    }
  })
  console.log(user2)
  console.log('----------------------------------------')

  // TODO: Retrieve all published posts
  const allPosts = []
  console.log(`Retrieved all published posts: `, allPosts)
  console.log('----------------------------------------')

  // TODO: Create a new post (written by an already existing user with email alice@prisma.io)
  const newPost = {}
  console.log(`Created a new post: `, newPost)
  console.log('----------------------------------------')

  // Retrieve all posts by user with email alice@prisma.io (fluent API)
  const postsByUser = {}
  console.log(`Retrieved all posts from a specific user: `, postsByUser)
  console.log('----------------------------------------')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
