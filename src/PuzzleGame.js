import React, { useState, useEffect } from "react";

const PuzzleGame = () => {
  const imgUrl = "https://i.ytimg.com/vi/L6u1-dUs424/hq720.jpg";

  const [pieces, setPieces] = useState([...Array(16).keys()]);
  const [placedPieces, setPlacedPieces] = useState(Array(16).fill(null));

  useEffect(() => {
    setPieces((prev) => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  const handleDragStart = (e, pieceIndex) => {
    e.dataTransfer.setData("text/plain", pieceIndex);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault(); 
    console.log(e,"e")

    const pieceIndex = parseInt(e.dataTransfer.getData("text"), 10);

    if (placedPieces[dropIndex] !== null || dropIndex !== pieceIndex) {
      alert("Incorrect placement! Try again.");
      return;
    }

    setPlacedPieces((prev) => {
      const newPlaced = [...prev];
      newPlaced[dropIndex] = pieceIndex;
      return newPlaced;
    });

    setPieces((prev) => prev.filter((p) => p !== pieceIndex));
  };

  return (
    <div className="game-container">
      <div className="reference-image">
        <img src={imgUrl} alt="Reference" />
      </div>

      <div className="puzzle-board">
        {placedPieces.map((piece, index) => (
          <div
            key={index}
            className="puzzle-slot"
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
          >
            {piece !== null && (
              <div
                className="puzzle-piece"
                draggable
                onDragStart={(e) => handleDragStart(e, piece)}
                style={{
                  backgroundImage: `url('${imgUrl}')`,
                  backgroundPosition: `-${(piece % 4) * 100}px -${Math.floor(piece / 4) * 100}px`,
                  backgroundSize: "400px 400px",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="pieces-container">
  {pieces.map((piece, index) => (
    <div
      key={index}
      className="puzzle-piece"
      draggable
      onDragStart={(e) => handleDragStart(e, piece)}
      style={{
        backgroundImage: `url('${imgUrl}')`,
        backgroundPosition: `-${(piece % 4) * 100}px -${Math.floor(piece / 4) * 100}px`,
        backgroundSize: "400px 400px",
      }}
    />
  ))}
</div>

    </div>
  );
};

export default PuzzleGame;
