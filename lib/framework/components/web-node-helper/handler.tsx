import styles from '../web-nodes/node.module.css';
import { generateHandlerId, validateConnection } from '../../utils';

import { useProjectContext } from '@/lib/context';
import { NodeHandlerType } from '@/lib/types';

export const NodeHandler = (props: NodeHandlerType) => {
  const { connection, setConnection } = useProjectContext();

  const handleStartConnection = ({ nodeId, handlerType, handlerKey }: NodeHandlerType) => {
    setConnection({
      from: {
        nodeId,
        handlerKey,
        handlerType,
      },
    });
  };

  const handleCompleteConnection = ({ nodeId, handlerType, handlerKey }: NodeHandlerType) => {
    if (connection?.from) {
      const isValidConnection = validateConnection(connection.from, { nodeId, handlerType, handlerKey });

      if (isValidConnection) {
        setConnection({
          from: connection.from,
          to: {
            nodeId,
            handlerKey,
            handlerType,
          },
        });
      }
    }
    setConnection(null);
  };

  return (
    <div
      className={styles.handler}
      data-handler-id={generateHandlerId(props)}
      onMouseDown={() => handleStartConnection(props)}
      onMouseUp={() => handleCompleteConnection(props)}
    />
  );
};
