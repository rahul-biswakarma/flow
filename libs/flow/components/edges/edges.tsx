import { EdgeType } from '../../types';
import { getHandlerElement } from '../../utils';

import { Edge } from './edge';

export const Edges = ({ edges }: { edges: EdgeType[] }) => {
  return (
    <>
      {edges.map((edge) => {
        const sourceHandlerElement = getHandlerElement(edge.source);
        const targetHandlerElement = getHandlerElement(edge.target);

        if (!sourceHandlerElement || !targetHandlerElement) {
          return null;
        }

        const sourcePosition = sourceHandlerElement.getBoundingClientRect();
        const targetPosition = targetHandlerElement.getBoundingClientRect();

        const sourceX = sourcePosition.left + sourcePosition.width / 2;
        const sourceY = sourcePosition.top + sourcePosition.height / 2;
        const targetX = targetPosition.left + targetPosition.width / 2;
        const targetY = targetPosition.top + targetPosition.height / 2;

        return <Edge key={edge.id} fromX={sourceX} fromY={sourceY} toX={targetX} toY={targetY} />;
      })}
    </>
  );
};
