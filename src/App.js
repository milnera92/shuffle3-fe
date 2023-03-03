import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #fef4e6;
  padding: 16px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #bde4c4;
  border: 4px solid #000;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 4px 4px 0 #000;
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #000;
`;

const Content = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #000;
`;

const Button = styled.button`
  font-size: 1.2rem;
  background-color: #f5b5d9;
  border: 4px solid #000;
  color: #000;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 16px;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #000;
  font-size: 2rem;

`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 4px solid #000;
  border-top-color: #f5b5d9;
  animation: ${rotate} 1s linear infinite;
`;

function App() {
  const [randomItem, setRandomItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://shuffle3-be.onrender.com/rss')
      .then(response => response.json())
      .then(data => {
        setRandomItem(data.items[Math.floor(Math.random() * data.items.length)]);
      });
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetch('https://shuffle3-be.onrender.com/rss')
      .then(response => response.json())
      .then(data => {
        setRandomItem(data.items[Math.floor(Math.random() * data.items.length)]);
        setLoading(false);
      });
  };

  return (
    <Container>
      {randomItem && (
        <Card>
          <Title>{randomItem.title}</Title>
          <Content>{randomItem.contentSnippet.substring(0, randomItem.contentSnippet.length - 91)}</Content>

          <audio src={randomItem.enclosure.url} controls></audio>

          <Button onClick={handleRefresh}>
            {loading ? <Spinner /> : "Refresh"}
          </Button>
        </Card>
      )}

      {!randomItem && (
        <Card>
          {loading && <Spinner />}
          {!loading && <Loading>Loading...</Loading>}
        </Card>
      )}
    </Container>
  );
}

export default App;
