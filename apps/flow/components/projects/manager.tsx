import type { Project, User } from "@flow/data-layer/types";
import { useScopedI18n } from "@flow/locales/client";
import { Button, Heading, Text } from "@ren/ui/components";
import { Icons } from "@ren/ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectSelector } from "./selector";

interface ProjectManagerProps {
  userData: User;
  projects: Project[];
  showCreateView: () => void;
}

export const ProjectManager = ({
  userData,
  projects,
  showCreateView,
}: ProjectManagerProps) => {
  const scopedT = useScopedI18n("onboarding");

  const projectsAvailable = projects.length > 0;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-4 w-full h-full p-4 z-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Heading weight="medium" size="7" highContrast={false}>
          {scopedT("select")}
        </Heading>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Text size="2" className="text-gray-10">
          {scopedT("select_description", {
            email: <span className="text-gray-12">{userData.email}</span>,
          })}
        </Text>
      </motion.div>
      {!projectsAvailable && (
        <motion.div
          variants={itemVariants}
          className="w-full max-w-[700px] border border-gray-4 bg-surface rounded-base"
        >
          <div className="flex flex-col gap-0.5 justify-center items-center py-8 h-full min-h-[200px] ">
            <Text size="2">{scopedT("empty")}</Text>
            <Text className="text-gray-10" size="2" highContrast={false}>
              {scopedT("get_started")}
            </Text>
            <Button onClick={showCreateView} className="mt-4" variant="solid">
              <Icons.Plus />
              {scopedT("new")}
            </Button>
          </div>
        </motion.div>
      )}
      {projectsAvailable && (
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-2 w-full max-w-[700px]"
        >
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.1 }}
              >
                <ProjectSelector project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.div variants={itemVariants}>
            <Button
              onClick={showCreateView}
              className="w-full mt-4"
              variant="solid"
            >
              <Icons.ArrowRight />
              {scopedT("create_new_project")}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
