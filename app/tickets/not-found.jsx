import React from 'react'
import Link from 'next/link'
export default function NotFound() {
  return (
    <main className='text-center'>
    <h2 className='text-3xl'>there was a problem</h2>
    <p>We couldont find the page you were looking for</p>
    <p>Go back to the <Link href='/tickets'>Tickets</Link></p>
</main>
  )
}
