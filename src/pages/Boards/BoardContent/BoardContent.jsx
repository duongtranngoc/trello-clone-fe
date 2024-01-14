import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { mapOrder } from "~/ultis/sorts";
import ListColumns from "./ListColumns/ListColumns";

import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";

import { cloneDeep } from "lodash";

const ACTIVE_GRA_ITEM_TYPE = {
  COLUMN: "ACTIVE_GRA_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_GRA_ITEM_TYPE_CARD",
};

function BoardContent({ board }) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 500,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderedColumns] = useState([]);

  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  useEffect(() => {
    setOrderedColumns(
      mapOrder(board?.columns, board?.columnOrderIds, "board_id")
    );
  }, [board]);

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards?.map((card) => card.card_id)?.includes(cardId)
    );
  };

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card.card_id === overCardId
      );

      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find(
        (column) => column.column_id === activeColumn.column_id
      );
      const nextOverColumn = nextColumns.find(
        (column) => column.column_id === overColumn.column_id
      );

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards?.filter(
          (card) => card.card_id !== activeDraggingCardId
        );
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards?.map(
          (card) => card.card_id
        );
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card.card_id !== activeDraggingCardId
        );

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn.column_id,
        };

        nextOverColumn.cards = nextOverColumn.cards?.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card.card_id
        );
      }

      return nextColumns;
    });
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_GRA_ITEM_TYPE.CARD
        : ACTIVE_GRA_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_GRA_ITEM_TYPE.COLUMN) return;
    const { active, over } = event;

    if (!active || !over) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;
    if (activeColumn.column_id !== overColumn.column_id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_GRA_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard.column_id !== overColumn.column_id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (card) => card.card_id === activeDragItemId
        );
        const newCardIndex = overColumn?.cards?.findIndex(
          (card) => card.card_id === overCardId
        );

        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          const targetColumn = nextColumns.find(
            (column) => column.column_id === overColumn.column_id
          );

          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map(
            (card) => card.card_id
          );

          return nextColumns;
        });
      }
    }

    if (
      activeDragItemType === ACTIVE_GRA_ITEM_TYPE.COLUMN &&
      active.id !== over.id
    ) {
      const oldColumnIndex = orderedColumns.findIndex(
        (column) => column.column_id === active.id
      );
      const newColumnIndex = orderedColumns.findIndex(
        (column) => column.column_id === over.id
      );

      const dndOrderedColumns = arrayMove(
        orderedColumns,
        oldColumnIndex,
        newColumnIndex
      );

      // later handle the api here
      // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c.column_id);
      setOrderedColumns(dndOrderedColumns);
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          width: "100%",
          height: (theme) => theme.trelloCustom.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />

        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_GRA_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_GRA_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
