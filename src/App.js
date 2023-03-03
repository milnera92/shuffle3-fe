import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Card = styled.div`
  background-color: #ff8080;
  border: 8px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  width: 80%;
  padding: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Content = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const PlayButton = styled.audio`
  display: block;
  margin: auto;
`;

const Loading = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

function App() {
  const [randomItem, setRandomItem] = useState(null);

  useEffect(() => {
    fetch('https://shuffle3-be.onrender.com/rss')
      .then(response => response.json())
      .then(data => {
        setRandomItem(data.items[Math.floor(Math.random() * data.items.length)]);
      });
  }, []);

  if (!randomItem) {
    return (
      <Container>
        <Loading>Loading...</Loading>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Title>{randomItem.title}</Title>
        <Content>{randomItem.contentSnippet.substring(0, randomItem.contentSnippet.length - 91)}</Content>
        <PlayButton src={randomItem.enclosure.url} controls></PlayButton>
      </Card>
    </Container>
  );
}

export default App;
