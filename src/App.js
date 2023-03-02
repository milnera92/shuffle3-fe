import { useEffect, useState } from "react";

function App() {
  // const [rssData, setRssData] = useState(null);
  const [randomItem, setRandomItem] = useState(null);

  useEffect(() => {
    console.log('useEffect called');
    fetch('/rss')
      .then(response => response.json())
      .then(data => {
        // setRssData(data);
        setRandomItem(data.items[Math.floor(Math.random() * data.items.length)]);
      });
  }, []);

  if (!randomItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {randomItem && (
        <div>
          <h2>{randomItem.title}</h2>
          <p>{randomItem.contentSnippet}</p>

          <audio src={randomItem.enclosure.url} controls></audio>
        </div>
      )}
    </div>
  );
}

export default App;
