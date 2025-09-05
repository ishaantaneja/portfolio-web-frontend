import React, { useState } from 'react'
import { sendMessage } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [ok, setOk] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await sendMessage(form)
      setOk(true)
      setForm({ name:'', email:'', message:'' })
    } catch (err) {
        console.error(err)
      setOk(false)
    }
  }

  return (
    <section>
      <h2>Contact</h2>
      <form onSubmit={onSubmit}>
        <input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <textarea required placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
        <button type="submit">Send</button>
      </form>
      {ok === true && <p>Message sent</p>}
      {ok === false && <p>Send failed</p>}
    </section>
  )
}
