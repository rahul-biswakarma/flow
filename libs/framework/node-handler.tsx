import { useState } from 'react';

import { NodeHandlerType, useFlowContext, validateConnection, generateHandlerId } from '@/libs/flow';
import styles from '@/libs/styles/node.module.css';

export const NodeHandler = (props: NodeHandlerType) => {
  const { connection, setConnection, createEdge } = useFlowContext();
  const [isValidConnection, setIsValidConnection] = useState<boolean | null>(null);

  const handleStartConnection = ({ nodeId, handlerType, handlerKey }: NodeHandlerType) => {
    setConnection({
      from: {
        nodeId,
        handlerKey,
        handlerType,
      },
    });
  };

  const handleMouseOver = ({ nodeId, handlerType, handlerKey }: NodeHandlerType) => {
    if (connection?.from) {
      const valid = validateConnection(connection.from, { nodeId, handlerType, handlerKey });
      const isDuplicate =
        connection.from.nodeId === nodeId &&
        connection.from.handlerType === handlerType &&
        connection.from.handlerKey === handlerKey;

      setIsValidConnection(valid);
    }
  };

  const handleMouseOut = () => {
    setIsValidConnection(null);
  };

  const handleCompleteConnection = ({ nodeId, handlerType, handlerKey }: NodeHandlerType) => {
    if (connection?.from) {
      const valid = validateConnection(connection.from, { nodeId, handlerType, handlerKey });

      if (valid) {
        createEdge(connection.from, { nodeId, handlerType, handlerKey });
      }
    }
    setConnection(null);
  };

  return (
    <div
      className={`${styles.handler} ${
        isValidConnection === true ? styles.acceptHandler : isValidConnection === false ? styles.rejectHandler : ''
      }`}
      data-handler-id={generateHandlerId(props)}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleStartConnection(props);
      }}
      onMouseOut={handleMouseOut}
      onMouseOver={() => handleMouseOver(props)}
      onMouseUp={() => handleCompleteConnection(props)}
    />
  );
};
