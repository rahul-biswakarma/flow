'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { Page, Project } from '@prisma/client';

import { ConnectionType, EdgeType, NodeHandlerType, NodeType, ProjectConfig } from '../types';
import { generateEdgeId } from '../framework/utils';

type ProjectWithPages = Project & {
  pages: Page[];
};

type ProjectContextType = {
  project: ProjectWithPages;
  setProject: React.Dispatch<React.SetStateAction<ProjectWithPages>>;

  projectConfig: ProjectConfig;
  setProjectConfig: React.Dispatch<React.SetStateAction<ProjectConfig>>;

  currentPageId: string;
  setCurrentPageId: React.Dispatch<React.SetStateAction<string>>;

  edges: EdgeType[];
  setEdges: React.Dispatch<React.SetStateAction<EdgeType[]>>;

  nodes: Record<string, NodeType>;
  setNodes: React.Dispatch<React.SetStateAction<Record<string, NodeType>>>;

  deleteNode: (nodeId: string) => void;
  createEdge: (from: NodeHandlerType, to: NodeHandlerType) => void;
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;

  connection: ConnectionType | null;
  setConnection: React.Dispatch<React.SetStateAction<ConnectionType | null>>;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

type ProjectContextProviderProps = {
  children: React.ReactNode;
  projectWithPages: ProjectWithPages;
};

export const ProjectContextProvider = ({ children, projectWithPages }: ProjectContextProviderProps) => {
  const [project, setProject] = useState<ProjectWithPages>(projectWithPages);
  const [projectConfig, setProjectConfig] = useState<ProjectConfig>({
    defaultUnit: 'px',
  });
  const [currentPageId, setCurrentPageId] = useState<string>(project?.pages[0]?.id ?? '');

  const [nodes, setNodes] = useState<Record<string, NodeType>>({});
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [connection, setConnection] = useState<ConnectionType | null>(null);

  const createEdge = useCallback(
    (from: NodeHandlerType, to: NodeHandlerType) => {
      setEdges((prevEdges) => {
        return [
          ...prevEdges,
          {
            id: `${generateEdgeId(from)}-${generateEdgeId(to)}`,
            source: from,
            target: to,
          },
        ];
      });
    },
    [setEdges],
  );

  const updateNodePosition = useCallback(
    (nodeId: string, position: { x: number; y: number }) => {
      setNodes((prevNodes) => ({
        ...prevNodes,
        [nodeId]: {
          ...prevNodes[nodeId],
          position,
        },
      }));

      setEdges((prevEdges) => {
        return prevEdges.map((edge) => {
          if (edge.source.nodeId === nodeId || edge.target.nodeId === nodeId) {
            return {
              ...edge,
              source: edge.source.nodeId === nodeId ? { ...edge.source, position } : edge.source,
              target: edge.target.nodeId === nodeId ? { ...edge.target, position } : edge.target,
            };
          }

          return edge;
        });
      });
    },
    [setNodes, setEdges],
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((prevNodes) => {
        const newNodes = { ...prevNodes };

        delete newNodes[nodeId];

        return newNodes;
      });

      setEdges((prevEdges) => {
        return prevEdges.filter((edge) => edge.source.nodeId !== nodeId && edge.target.nodeId !== nodeId);
      });
    },
    [setNodes, setEdges],
  );

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        currentPageId,
        setCurrentPageId,
        projectConfig,
        setProjectConfig,
        nodes,
        setNodes,
        edges,
        setEdges,
        deleteNode,
        connection,
        setConnection,
        createEdge,
        updateNodePosition,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export function useProjectContext() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectContextProvider');
  }

  return context;
}
