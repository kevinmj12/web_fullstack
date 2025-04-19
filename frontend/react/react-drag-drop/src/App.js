import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./App.css";

const finalSpaceCharacter = [
  {
    id: "gary",
    name: "Gary Goodspeed",
  },
  {
    id: "cato",
    name: "Littel Cato",
  },
  {
    id: "kvn",
    name: "KVN",
  },
];

function SortableItem({ id, name }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "8px",
    cursor: "grab",
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p>{name}</p>
    </li>
  );
}

function App() {
  const [characters, setCharacters] = useState(finalSpaceCharacter);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = characters.findIndex((c) => c.id === active.id);
      const newIndex = characters.findIndex((c) => c.id === over.id);

      setCharacters((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={characters.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="characters">
              {characters.map(({ id, name }) => (
                <SortableItem key={id} id={id} name={name} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </header>
    </div>
  );
}

export default App;
