// @ts-check
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  await prisma.comment.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.user.deleteMany({})


  // Create first user with two posts and include relation in response
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice from the wonderland',
      email: 'alice@prisma.io',
      posts: {
        create: [
          {
            title: 'Alice first post',
            content: 'welcome to my first post',
            published: true,
          },
          {
            title: 'Alice second post',
            content: 'welcome to my second post',
          },
        ],
      },
    },
    include: {
      posts: true
    }
  })
  console.log(user1)

  // Create second user with 1 post and add a comment to post from first user
  const user2 = await prisma.user.create({
    data: {
      name: 'Shakuntala Devi',
      email: 'devi@prisma.io',
      comments: {
        create: {
          comment: 'hey this was a really interesting read...',
          post: {
            connect: {
              id: user1.posts[0].id
            }
          }
        }
      }
    }
  })

  // Retrieve all published posts
  console.log(`Retrieved all published posts: `, allPosts)

  // Create a new post (written by an already existing user with email alice@prisma.io)
  const newPost = {}
  console.log(`Created a new post: `, newPost)

  // Retrieve all posts by user with email alice@prisma.io (fluent API)
  const postsByUser = {}
  console.log(`Retrieved all posts from a specific user: `, postsByUser)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.disconnect()
  })
