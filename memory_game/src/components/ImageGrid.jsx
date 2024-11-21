import * as React from "react";
import ImageCard from "./ImageCard";
import Confetti from "react-confetti";

const imageData = [
  { id: 1, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4924ba53919bc40304284a9917f2b14d07ba1d5fb6651a991ff849b31e280e35?placeholderIfAbsent=true&apiKey=1620319c31874ecc8de775419e3f8ae4", alt: "Image 1" },
  { id: 2, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/61b9b277fc52d34054224cc693f291645522e0f56b57e4764f54d694ebb75ce0?placeholderIfAbsent=true&apiKey=1620319c31874ecc8de775419e3f8ae4", alt: "Image 2" },
  { id: 3, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2bebd6bf4bdd4234463516fcd8bcc379223c96b281244d03d7565c482d502729?placeholderIfAbsent=true&apiKey=1620319c31874ecc8de775419e3f8ae4", alt: "Image 3" },
  { id: 4, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4da4ef24070cb7934a641d9efdb0bbbd7f3ee18125f34b11df80cd092b5dcfee?placeholderIfAbsent=true&apiKey=1620319c31874ecc8de775419e3f8ae4", alt: "Image 4" },
  { id: 5, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/946b0cde3eee61b28961cd9946625081b9e2faab923cb12c9eac3803036472c0?placeholderIfAbsent=true&apiKey=1620319c31874ecc8de775419e3f8ae4", alt: "Image 5" },
  { id: 6, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/75076ce778bdc8f9c28430b3c424ef8c1890a2507ab88be2c0c19942f9c35314?placeholderIfAbsent=true&apiKey=1620319c31874ecc8de775419e3f8ae4", alt: "Image 6" },
];

export function ImageGrid() {
  const [cards, setCards] = React.useState([]);
  const [flippedCards, setFlippedCards] = React.useState([]);
  const [matchedCards, setMatchedCards] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [moves, setMoves] = React.useState(0);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [isTimeOut, setIsTimeOut] = React.useState(false);
  const [timer, setTimer] = React.useState(60); 

  // Shuffle the images and duplicate them for the memory game
  React.useEffect(() => {
    const shuffledCards = [...imageData, ...imageData]
      .map((card) => ({ ...card, id: Math.random() })) // Assign random id for shuffling
      .sort(() => Math.random() - 0.5); // Fisher-Yates shuffle algorithm
    setCards(shuffledCards);
    

    // for x mins timer 
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsTimeOut(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(countdown);
  }, []);

  // Handle card flip
  const handleCardClick = (id, src) => {
    if (flippedCards.length === 2 || flippedCards.find((card) => card.id === id)) return;

    const newFlippedCards = [...flippedCards, { id, src }];
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1); 

    if (newFlippedCards.length === 2) {
      // Check for match
      if (newFlippedCards[0].src === newFlippedCards[1].src) {
        setMatchedCards([...matchedCards, newFlippedCards[0].src]);
        setScore(score + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000); // Flip back after 1 second
      }
    }
  };

  const resetGame = () => {
    // setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setMoves(0);
    setIsGameOver(false);
    setIsTimeOut(false);
    setTimer(30);
    // localStorage.setItem("maxScore", "0");
  };

  React.useEffect(() => {
    if (matchedCards.length === imageData.length) {

      console.log(typeof(localStorage.getItem("maxScore")))
      localStorage.setItem("maxScore", Math.min(moves, localStorage.getItem("maxScore")));
      setIsGameOver(true);
    }
  }, [matchedCards, moves]);

  return (
    <main className="flex flex-col items-center text-xl mt-5">
      {isGameOver && <Confetti />}
      {isGameOver && <div>Congratulations! You completed the game in {moves} moves. <button onClick={resetGame}>Reset</button></div>}
      {isTimeOut && <div>Your time has run out! <button onClick={resetGame}>Reset</button></div>}
      <h1>Memory Game</h1>
      <section className="grid grid-cols-4 gap-6 max-w-xl w-full border shadow-2xl">
        {cards.map((card) => (
          <ImageCard
            key={card.id}
            imageSrc={card.src}
            altText={card.alt}
            isFlipped={flippedCards.some((flippedCard) => flippedCard.id === card.id) || matchedCards.includes(card.src)}
            onCardClick={() => handleCardClick(card.id, card.src)}
          />
        ))}
      </section>
      <div className="mt-4 text-center text-xl">
        <p>Score: {score}</p>
        <p>Moves: {moves}</p>
        <p>Time Remaining: {Math.floor(timer / 60)}:{(timer % 60)}</p>
      </div>
    </main>
  );
}