function getFullName(user: { firstName: string; lastName: string }) {
  return `${user.firstName} ${user.lastName}`
}

getFullName()

getFullName({})

getFullName({ firstName: 'Shakuntala' })

