import React, { useEffect, useState } from 'react'
import { fetchProjects } from '../services/api'

export default function Projects() {
  const [data, setData] = useState([])
  useEffect(() => {
    let mounted = true
    fetchProjects().then(r => mounted && setData(r.data || [])).catch(() => {})
    return () => { mounted = false }
  }, [])
  return (
    <section>
      <h2>Projects</h2>
      {data.length === 0 && <p>No projects yet — CMS will populate this.</p>}
      <ul>
        {data.map(p => (
          <li key={p._id}>
            <a href={p.link} target="_blank" rel="noreferrer">{p.title}</a>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}