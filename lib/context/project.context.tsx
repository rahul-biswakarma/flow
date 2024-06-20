'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Page, Project } from '@prisma/client';
import { useNodesState, useEdgesState, Edge, Node, OnNodesChange, OnEdgesChange } from '@xyflow/react';

type ProjectWithPages = Project & {
  pages: Page[];
};

type ProjectContextType = {
  project: ProjectWithPages;
  setProject: React.Dispatch<React.SetStateAction<ProjectWithPages>>;

  currentPageId: string;
  setCurrentPageId: React.Dispatch<React.SetStateAction<string>>;

  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onEdgesChange: OnEdgesChange<Edge>;

  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  onNodesChange: OnNodesChange<Node>;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

type ProjectContextProviderProps = {
  children: React.ReactNode;
  projectWithPages: ProjectWithPages;
};

export const ProjectContextProvider = ({ children, projectWithPages }: ProjectContextProviderProps) => {
  const [project, setProject] = useState<ProjectWithPages>(projectWithPages);
  const [currentPageId, setCurrentPageId] = useState<string>(project?.pages[0]?.id ?? '');

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    const currentPage = project.pages.find((page) => page.id === currentPageId);

    if (!currentPage) return;

    try {
      const data = JSON.parse(currentPage.data);

      setNodes(data.nodes);
      setEdges(data.edges);
    } catch {
      setNodes([]);
      setEdges([]);
    }
  }, [currentPageId, project.pages, setNodes, setEdges]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        currentPageId,
        setCurrentPageId,
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
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
