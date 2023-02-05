import { authApi } from '@/api/index'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import React from 'react'

export default function LoginPage() {
  const router = useRouter()
  const { profile, login, logout } = useAuth({
    revalidateOnMount: false,
  })

  async function handleLoginClick() {
    try {
      await login()
      console.log('redirect to dashboad')
      router.push('./about')
    } catch (error) {
      console.log('failed to login', error)
    }
  }

  async function handleGetProfileClick() {
    try {
      await authApi.getProfile()
    } catch (error) {
      console.log('failed to get profile', error)
    }
  }

  async function handleLogoutClick() {
    try {
      await logout()

      console.log('redirect to login page')
    } catch (error) {
      console.log('failed to loguot', error)
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleGetProfileClick}>Get Profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
      <button onClick={() => router.push('/about')}>Go to About</button>
    </div>
  )
}
