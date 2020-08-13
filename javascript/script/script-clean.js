const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  // Create first user with two posts and include relation in response
  const user1 = {}

  console.log('user1: ', user1)

  // Create second user with 1 post and add a comment to post from first user
  const user2 = {}

  // Retrieve all published posts
  const allPosts = {}
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
