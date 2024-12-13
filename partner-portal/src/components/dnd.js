import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem"; // Ensure this is defined correctly

// Initial layout: each item is in a separate row
const initialLayout = [
  ["Textbox 1"],
  ["Textbox 2"],
  ["Textbox 3"],
  ["Textbox 4"],
  ["Textbox 5"],
];

export default function App() {
  const [rows, setRows] = useState(initialLayout);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return; // If no drop target, exit

    const draggedItemId = active.id;
    const overId = over.id;

    setRows((prevRows) => {
      const newRows = prevRows.map((row) => [...row]); // Clone rows to avoid direct mutation

      // Find the dragged item and its position in the row
      const [draggedRowIndex, draggedItemIndex] = findItem(
        newRows,
        draggedItemId
      );

      // Find the target row and item
      const [overRowIndex, overItemIndex] = findItem(newRows, overId);

      // Handle drop onto a row (empty space)
      if (overId.startsWith("row-")) {
        const targetRowIndex = parseInt(overId.split("-")[1], 10);

        // Check if we are moving the item to a different row
        if (draggedRowIndex !== targetRowIndex) {
          const [draggedItem] = newRows[draggedRowIndex].splice(
            draggedItemIndex,
            1
          ); // Remove from old row
          newRows[targetRowIndex].push(draggedItem); // Add to the target row
        }
      } else if (draggedRowIndex === overRowIndex) {
        // Reordering items within the same row
        const [draggedItem] = newRows[draggedRowIndex].splice(
          draggedItemIndex,
          1
        );
        newRows[draggedRowIndex].splice(overItemIndex, 0, draggedItem); // Insert at over item's position
      } else {
        // Moving between rows (i.e., not within the same row)
        const [draggedItem] = newRows[draggedRowIndex].splice(
          draggedItemIndex,
          1
        ); // Remove from old row
        newRows[overRowIndex].splice(overItemIndex, 0, draggedItem); // Add to the target row
      }

      // Filter out empty rows
      return newRows.filter((row) => row.length > 0);
    });
  };

  // Find the row and index of an item by its ID
  const findItem = (rows, id) => {
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const colIndex = rows[rowIndex].indexOf(id);
      if (colIndex !== -1) return [rowIndex, colIndex];
    }
    return [-1, -1];
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "1rem",
        }}
      >
        {rows.map((row, rowIndex) => (
          <SortableContext
            key={`row-${rowIndex}`}
            items={row}
            strategy={rectSortingStrategy}
          >
            <div
              id={`row-${rowIndex}`}
              style={{
                display: "flex",
                gap: "10px",
                border: "1px dashed #ccc",
                padding: "10px",
                minHeight: "50px",
                alignItems: "center",
                borderRadius: "5px",
                backgroundColor: row.length === 0 ? "#f9f9f9" : "transparent", // Highlight empty rows
              }}
            >
              {row.map((item) => (
                <SortableItem key={item} id={item}>
                  {item}
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
