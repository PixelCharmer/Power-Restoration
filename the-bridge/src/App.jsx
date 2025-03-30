import React, { useState } from "react";
import "./App.css";

const correctOrder = ["Pink", "Purple", "Blue", "Yellow"];

const App = () => {
    const [nodes, setNodes] = useState([
        { id: 1, color: "Yellow" },
        { id: 2, color: "Red" },
        { id: 3, color: "Blue" },
        { id: 4, color: "Green" },
        { id: 5, color: "Pink" },
        { id: 6, color: "Orange" },
        { id: 7, color: "Cyan" },
        { id: 8, color: "Purple" },
    ]);

    const [dropZone, setDropZone] = useState([]);

    const handleDragStart = (e, node) => {
        e.dataTransfer.setData("nodeId", node.id);
    };

    const handleDrop = (e) => {
        const nodeId = e.dataTransfer.getData("nodeId");
        const node = nodes.find((n) => n.id === parseInt(nodeId));

        if (node && dropZone.length < 4) {
            setDropZone((prev) => [...prev, node]);
            setNodes((prev) => prev.filter((n) => n.id !== node.id));
        }
    };

    const resetGame = () => {
        setNodes([
            { id: 1, color: "Yellow" },
            { id: 2, color: "Red" },
            { id: 3, color: "Blue" },
            { id: 4, color: "Green" },
            { id: 5, color: "Pink" },
            { id: 6, color: "Orange" },
            { id: 7, color: "Cyan" },
            { id: 8, color: "Purple" },
        ]);
        setDropZone([]);
    };

    const checkSolution = () => {
        const isCorrect = dropZone.map((n) => n.color).join(",") === correctOrder.join(",");
        alert(isCorrect ? "Power Restored! Door Code:64831" : "Incorrect Sequence. Try Again!");
    };

    return (
        <div className="container">
            <h1>Circuit Lock Override</h1>
            <div className="puzzle-container">
                <div className="node-container">
                    <h2>Nodes</h2>
                    {nodes.map((node) => (
                        <div
                            key={node.id}
                            className={`node ${node.color.toLowerCase()}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, node)}
                        >
                            {node.color}
                        </div>
                    ))}
                </div>

                <div className="drop-zone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                    <h2>Drop Zone</h2>
                    {dropZone.map((n, index) => (
                        <div key={index} className={`node ${n.color.toLowerCase()}`}>
                            {n.color}
                        </div>
                    ))}
                </div>
            </div>

            <div className="buttons">
                <button onClick={checkSolution}>Check</button>
                <button onClick={resetGame}>Reset</button>
            </div>
        </div>
    );
};

export default App;
