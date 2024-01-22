import Container from "@mui/material/Container";

import { isEmpty } from "lodash";

import { useEffect, useState } from "react";

// import { mockData } from "~/apis/mock-data";

import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI,
  updateBoardDetailsAPI,
} from "~/apis";

import AppBar from "~/components/AppBar/AppBar";

import { generatePlaceholderCard } from "~/ultis/formatters";

import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

function BoardDetails() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "65ad1feeea0445b06cff80fc";

    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
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

  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id);

    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    await updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds,
    });
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  );
}

export default BoardDetails;
