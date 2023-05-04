import React, { useState } from "react";
import { Intro } from "./components";
import { Square } from "./components/square";

const App = () => {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [status, setStatus] = useState("X");

	const handleClick = (i) => {
		const newBoard = [...board];
		newBoard[i] = status;
		setBoard(newBoard);
		setStatus(status === "X" ? "O" : "X");
	};

	const Board = () => {
		const renderSquare = (i) => {
			return <Square value={board[i]} onClick={() => handleClick(i)} />;
		};

		const checkWinner = () => {
			const lines = [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6],
			];
			for (let i = 0; i < lines.length; i++) {
				const [a, b, c] = lines[i];
				if (board[a] && board[a] === board[b] && board[a] === board[c]) {
					return board[a];
				}
			}
			return null;
		};

		const winner = checkWinner();
		const isDraw = board.every((square) => square !== null);

		let statusMsg;
		if (winner) {
			statusMsg = `Winner Player: ${winner}`;
		} else if (isDraw) {
			statusMsg = "Draw!";
		} else {
			statusMsg = `Next player: ${status}`;
		}

		return (
			<div>
				<div className="status">{statusMsg}</div>
				<div className="board-row">
					{renderSquare(0)}
					{renderSquare(1)}
					{renderSquare(2)}
				</div>
				<div className="board-row">
					{renderSquare(3)}
					{renderSquare(4)}
					{renderSquare(5)}
				</div>
				<div className="board-row">
					{renderSquare(6)}
					{renderSquare(7)}
					{renderSquare(8)}
				</div>
			</div>
		);
	};

	return (
		<div id="main">
			<Intro />
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
			</div>
		</div>
	);
};

export default App;
