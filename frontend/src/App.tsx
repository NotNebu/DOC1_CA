import { useState } from 'react'
import { StoryForm } from "./components/StoryForm";
import { StoryList } from "./components/StoryList";

function App() {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div>
      <h1>VIA Tabloid</h1>
      <StoryForm onAdd={triggerRefresh} />
      <StoryList key={refresh.toString()} />
    </div>
  );
}

export default App;

