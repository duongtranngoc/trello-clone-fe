import Box from "@mui/material/Box";
import { useEffect, useState, useCallback, useRef } from "react";
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
  pointerWithin,
  // rectIntersection,
  getFirstCollision,
  // closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";

import { cloneDeep, isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/ultis/formatters";

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

  const lastOverId = useRef(null);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const findColumnBy_id = (_id) => {
    return orderedColumns.find((column) =>
      column.cards?.map((card) => card._id)?.includes(_id)
    );
  };

  const moveCardBetweenDifferentColumns = (
    overColumn,
    over_id,
    active,
    over,
    activeColumn,
    activeDragging_id,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === over_id
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
        (column) => column._id === activeColumn._id
      );
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards?.filter(
          (card) => card._id !== activeDragging_id
        );

        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards?.map(
          (card) => card._id
        );
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDragging_id
        );

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          _id: nextOverColumn._id,
        };

        nextOverColumn.cards = nextOverColumn.cards?.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );

        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_PlaceholderCard
        );

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }

      return nextColumns;
    });
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?._id
        ? ACTIVE_GRA_ITEM_TYPE.CARD
        : ACTIVE_GRA_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);

    if (event?.active?.data?.current?._id) {
      setOldColumnWhenDraggingCard(findColumnBy_id(event?.active?.id));
    }
  };

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_GRA_ITEM_TYPE.COLUMN) return;
    const { active, over } = event;

    if (!active || !over) return;

    const {
      id: activeDragging_id,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: over_id } = over;

    const activeColumn = findColumnBy_id(activeDragging_id);
    const overColumn = findColumnBy_id(over_id);

    if (!activeColumn || !overColumn) return;
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        over_id,
        active,
        over,
        activeColumn,
        activeDragging_id,
        activeDraggingCardData
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_GRA_ITEM_TYPE.CARD) {
      const {
        id: activeDragging_id,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: over_id } = over;

      const activeColumn = findColumnBy_id(activeDragging_id);
      const overColumn = findColumnBy_id(over_id);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          over_id,
          active,
          over,
          activeColumn,
          activeDragging_id,
          activeDraggingCardData
        );
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (card) => card._id === activeDragItemId
        );
        const newCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === over_id
        );

        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          );

          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id);

          return nextColumns;
        });
      }
    }

    if (
      activeDragItemType === ACTIVE_GRA_ITEM_TYPE.COLUMN &&
      active.id !== over.id
    ) {
      const oldColumnIndex = orderedColumns.findIndex(
        (column) => column._id === active.id
      );
      const newColumnIndex = orderedColumns.findIndex(
        (column) => column._id === over.id
      );

      const dndOrderedColumns = arrayMove(
        orderedColumns,
        oldColumnIndex,
        newColumnIndex
      );

      // later handle the api here
      // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
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

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_GRA_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }

      const pointerIntersections = pointerWithin(args);

      if (!pointerIntersections?.length) return;

      // const intersections = !!pointerIntersections?.length
      //   ? pointerIntersections
      //   : rectIntersection(args);

      // let overId = getFirstCollision(intersections, "id");
      let overId = getFirstCollision(pointerIntersections, "id");

      if (overId) {
        const checkColumn = orderedColumns.find(
          (column) => column._id === overId
        );

        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkColumn?.cardOrderIds?.includes(container.id)
                );
              }
            ),
          })[0]?.id;
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns]
  );

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
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
