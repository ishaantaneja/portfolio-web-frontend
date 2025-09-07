import React, { useEffect, useState } from "react";
import { fetchSkills, addSkill, deleteSkill } from "../services/api";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const loadSkills = async () => {
    try {
      const { data } = await fetchSkills();
      setSkills(data);
    } catch (err) {
      console.error("Failed to fetch skills", err);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const onAddSkill = async (e) => {
    e.preventDefault();
    try {
      await addSkill({ name: newSkill });
      setNewSkill("");
      loadSkills();
    } catch (err) {
      console.error("Failed to add skill", err);
    }
  };

  const onDeleteSkill = async (id) => {
    try {
      await deleteSkill(id);
      loadSkills();
    } catch (err) {
      console.error("Failed to delete skill", err);
    }
  };

  return (
    <section>
      <h2>Skills</h2>

      <form onSubmit={onAddSkill} style={{ marginBottom: 16 }}>
        <input
          required
          placeholder="New skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {skills.map((s) => (
          <li key={s._id}>
            {s.name}
            <button onClick={() => onDeleteSkill(s._id)}>❌</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
