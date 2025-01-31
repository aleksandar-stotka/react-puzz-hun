import React, { useState, useEffect } from "react";

const PuzzleGame = () => {
  const imgUrl = "https://i.ytimg.com/vi/L6u1-dUs424/hq720.jpg";
  
  const [pieces, setPieces] = useState([...Array(16).keys()]); // Pieces start outside
  const [placedPieces, setPlacedPieces] = useState(Array(16).fill(null)); // Empty slots
  

  // Shuffle pieces on load
  useEffect(() => {
    setPieces((prev) => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  // Dragging a piece
  const handleDragStart = (e, pieceIndex) => {
    e.dataTransfer.setData("text/plain", pieceIndex);
  };

  // Dropping a piece into the board
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const pieceIndex = parseInt(e.dataTransfer.getData("text"), 10);
  
    // If the slot is already occupied, or if the piece is not meant for this slot, do nothing
    if (placedPieces[dropIndex] !== null || dropIndex !== pieceIndex) {
      alert("Incorrect placement! Try again.");
      return;
    }
  
    // Place the piece in the correct slot
    setPlacedPieces((prev) => {
      const newPlaced = [...prev];
      newPlaced[dropIndex] = pieceIndex;
      return newPlaced;
    });
  
    // Remove the placed piece from the external container (Prevent Duplicates)
    setPieces((prev) => prev.filter((p) => p !== pieceIndex));
  };
  
  

  return (
    <div className="game-container">
      {/* Full Reference Image */}
      <div className="reference-image">
        <img src={imgUrl} alt="Reference" />
      </div>

      {/* Puzzle Board (Empty Slots) */}
      <div className="puzzle-board">
        {placedPieces.map((piece, index) => (
          <div
            key={index}
            className="puzzle-slot"
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => e.preventDefault()} // Allow dragging over
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

      {/* Pieces Outside the Board */}
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
