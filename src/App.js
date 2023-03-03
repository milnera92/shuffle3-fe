import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color:  #FFDFD3;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  padding: 2rem;
  background-color: #ffffcc;
  border: 8px solid #000000;
  box-shadow: 10px 10px 0px #000000;
  margin: 2rem;
  background-color: beige;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Content = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const Audio = styled.audio`
  margin-top: 1rem;
`;

function App() {
  const [randomItem, setRandomItem] = useState(null);

  useEffect(() => {
    console.log('useEffect called');
    fetch('https://shuffle3-be.onrender.com/rss')
      .then(response => response.json())
      .then(data => {
        setRandomItem(data.items[Math.floor(Math.random() * data.items.length)]);
      });
  }, []);

  if (!randomItem) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      {randomItem && (
        <Card>
          <Title>{randomItem.title}</Title>
          <Content>{randomItem.contentSnippet.substring(0, randomItem.contentSnippet.length - 91)}</Content>
          <Audio src={randomItem.enclosure.url} controls></Audio>
        </Card>
      )}
    </Container>
  );
}

export default App;
