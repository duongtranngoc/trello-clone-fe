import Container from "@mui/material/Container";

// import { mockData } from "~/apis/mock-data";

import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { useEffect, useState } from "react";

import { fetchBoardDetailsAPI } from "~/apis";

function BoardDetails() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "65ad1feeea0445b06cff80fc";

    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board);
    });
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  );
}

export default BoardDetails;
