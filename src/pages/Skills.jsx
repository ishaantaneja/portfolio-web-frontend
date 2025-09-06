import React, { useEffect, useState } from 'react'
import { fetchSkills } from '../services/api'

export default function Skills() {
  const [skills, setSkills] = useState([])
  useEffect(() => {
    fetchSkills().then(r => setSkills(r.data || [])).catch(() => {})
  }, [])
  return (
    <section>
      <h2>Skills</h2>
      <ul>
        {skills.map(s => <li key={s._id}>{s.name} — {s.level}</li>)}
      </ul>
    </section>
  )
}
