import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";

import { isEmpty } from "lodash";

import { useEffect, useState } from "react";

// import { mockData } from "~/apis/mock-data";

import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
} from "~/apis";
import { mapOrder } from "~/ultis/sorts";

import AppBar from "~/components/AppBar/AppBar";

import { generatePlaceholderCard } from "~/ultis/formatters";

import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { Typography } from "@mui/material";

function BoardDetails() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "65aeb712914def434d17694a";

    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });
      setBoard(board);
    });
  }, []);

  const createNewColumn = async (newColumnData) => {
    const createdNewColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    createNewColumn.cards = [generatePlaceholderCard(createNewColumn)];
    createNewColumn.cardOrderIds = [
      generatePlaceholderCard(createNewColumn)._id,
    ];

    const newBoard = { ...board };
    newBoard.columns.push(createdNewColumn);
    newBoard.columnOrderIds.push(createdNewColumn._id);
    setBoard(newBoard);
  };

  const createNewCard = async (newCardData) => {
    const createdNewCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });

    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdNewCard.columnId
    );

    if (columnToUpdate) {
      columnToUpdate.cards.push(createdNewCard);
      columnToUpdate.cardOrderIds.push(createdNewCard._id);
    }
    setBoard(newBoard);
  };

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id);

    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds,
    });
  };

  const moveCardInTheSameColumns = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards;
      columnToUpdate.cardOrderIds = dndOrderedCardIds;
    }
    setBoard(newBoard);

    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds });
  };

  if (!board) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    );
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumns={moveCardInTheSameColumns}
      />
    </Container>
  );
}

export default BoardDetails;
