import { notFound } from 'next/navigation'
import Loading from '@/app/loading'
export const dynamicParams = true

export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/tickets')

    const tickets = await res.json()

    return tickets.map((ticket) => ({
        id: ticket.id
    }))
}

import React from 'react'

async function getTicket(id){
    // imitate delay
    await new Promise(resolve => setTimeout(resolve,3000))
    
    const res = await fetch(`http://localhost:4000/tickets/${id}`, {
        next:{
            revalidate:60  // 0 to refrech all the time
        }
    })

    if (!res.ok) {
        notFound()
    }

    return res.json()
}
export default async function TicketDetails({params}) {
    const ticket = await getTicket(params.id)
    return (
        <main>
            <nav>
                <h2>Ticket Detalis</h2>
            </nav>
            <div className="card">
                <h3>{ticket.title}</h3>
                <small>created by {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>
                    {ticket.priority} priority
                </div>
            </div>
        </main>
    )
}
