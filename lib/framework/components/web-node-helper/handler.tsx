import { useState } from 'react';

import { generateHandlerId, validateConnection } from '../../utils';

import styles from '@/lib/styles/node.module.css';
import { useProjectContext } from '@/lib/context';
import { NodeHandlerType } from '@/lib/types';

export const NodeHandler = (props: NodeHandlerType) => {
  const { connection, setConnection, createEdge } = useProjectContext();
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
      onMouseDown={() => handleStartConnection(props)}
      onMouseOut={handleMouseOut}
      onMouseOver={() => handleMouseOver(props)}
      onMouseUp={() => handleCompleteConnection(props)}
    />
  );
};
