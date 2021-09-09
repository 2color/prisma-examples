import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const usersByCity = await prisma.user.groupBy({
    by: ['city'],
    _count: {
      city: true,
    },
    orderBy: {
      _count: {
        city: 'desc',
      },
    },
  })

  console.log('Order by Aggregate in Group By')
  console.log(
    'User count per city ordered by count in descending order',
    usersByCity,
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
