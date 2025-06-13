import { useState } from "react";

export function StoryForm({ onAdd }: { onAdd: () => void }) {
  const [story, setStory] = useState({ title: "", content: "", department: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:30080/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(story),
      });      
    setStory({ title: "", content: "", department: "" });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={story.title} onChange={(e) => setStory({ ...story, title: e.target.value })} placeholder="Title" />
      <input value={story.content} onChange={(e) => setStory({ ...story, content: e.target.value })} placeholder="Content" />
      <input value={story.department} onChange={(e) => setStory({ ...story, department: e.target.value })} placeholder="Department" />
      <button type="submit">Add Story</button>
    </form>
  );
}
