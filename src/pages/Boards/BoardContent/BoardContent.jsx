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

  const [orderedColumns, set0rderedColumns] = useState([]);

  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);

  useEffect(() => {
    set0rderedColumns(
      mapOrder(board?.columns, board?.columnOrderIds, "board_id")
    );
  }, [board]);

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards?.map((card) => card.card_id)?.includes(cardId)
    );
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_GRA_ITEM_TYPE.CARD
        : ACTIVE_GRA_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_GRA_ITEM_TYPE.COLUMN) return;
    const { active, over } = event;

    if (!active || !over) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDragCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;
    if (activeColumn.column_id !== overColumn.column_id) {
      set0rderedColumns((prevColumns) => {
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
          nextActiveColumn.cardOderIds = nextActiveColumn.cards?.map(
            (card) => card.card_id
          );
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards?.filter(
            (card) => card.card_id !== activeDraggingCardId
          );

          nextOverColumn.cards = nextOverColumn.cards?.toSpliced(
            newCardIndex,
            0,
            activeDragCardData
          );

          nextOverColumn.cardOderIds = nextOverColumn.cards?.map(
            (card) => card.card_id
          );
        }

        return nextColumns;
      });
    }
  };

  const handleDragEnd = (event) => {
    if (activeDragItemType === ACTIVE_GRA_ITEM_TYPE.CARD) return;

    const { active, over } = event;

    if (!active || !over) return;

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(
        (c) => c.column_id === active.id
      );

      const newIndex = orderedColumns.findIndex((c) => c.column_id === over.id);

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);

      // later handle the api here
      // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c.column_id);
      set0rderedColumns(dndOrderedColumns);
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
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
