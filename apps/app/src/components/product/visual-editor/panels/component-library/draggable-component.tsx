import { Card } from "@v1/ui/card";
import { Text } from "@v1/ui/text";
import { clsx } from "clsx";
import { useDrag } from "react-dnd";
import type { DraggableComponentProps } from "./types";

export const DraggableComponent = ({
  id,
  name,
  icon,
  category,
}: DraggableComponentProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { id, name, category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={clsx(
        "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50",
      )}
    >
      <Card className="p-2 hover:bg-accent-3 transition-colors">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <Text size="1">{name}</Text>
        </div>
      </Card>
    </div>
  );
};
