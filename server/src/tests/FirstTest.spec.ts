import { User } from '@models/User'

test('it should be ok', () => {
  const user = new User('Gustavo', 'gustavotp@gmail.com')

  expect(user.name).toEqual('Gustavo')
})
