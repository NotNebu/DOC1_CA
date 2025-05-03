import { useEffect, useState } from "react";

export function StoryList() {
  const [stories, setStories] = useState<any[]>([]);

  const fetchStories = async () => {
    const res = await fetch("http://127.0.0.1:1570/api/stories");
    const data = await res.json();
    setStories(data);
  };

  const deleteStory = async (id: number) => {
    await fetch(`http://127.0.0.1:1570/api/stories/${id}`, { method: "DELETE" });
    fetchStories();
  };

  useEffect(() => { fetchStories(); }, []);

  return (
    <div>
      {stories.map((story) => (
        <div key={story.id}>
          <h3>{story.title}</h3>
          <p>{story.content}</p>
          <p><b>{story.department}</b></p>
          <button onClick={() => deleteStory(story.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
