import { authApi } from '@/api-client'
import { PublicConfiguration } from 'swr/_internal'
import useSWR from 'swr'

export function useAuth(options?: Partial<PublicConfiguration>) {
  //profile
  //
  const MILISECOND_PER_HOUR = 60 * 60 * 1000

  const {
    data: profile,
    error,
    mutate,
  } = useSWR('./profile', {
    revalidateOnFocus: false,
    dedupingInterval: MILISECOND_PER_HOUR,
    ...options,
  })

  async function login() {
    await authApi.login({
      username: 'test',
      password: '123456',
    })

    await mutate()
  }

  async function logout() {
    await authApi.logout

    mutate({}, false)
  }

  return {
    profile,
    error,
    login,
    logout,
  }
}
