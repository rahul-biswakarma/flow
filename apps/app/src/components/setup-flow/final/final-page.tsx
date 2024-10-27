import { useFlowContext } from "@/context";
import { useScopedI18n } from "@/locales/client";
import { createClient } from "@v1/supabase/client";
import { Button } from "@v1/ui/button";
import { Heading } from "@v1/ui/heading";
import { Icons } from "@v1/ui/icons";
import { Kbd } from "@v1/ui/kbd";
import { Text } from "@v1/ui/text";
import { toast } from "@v1/ui/toast";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type FinalPageProps = {
  onComplete: () => void;
};

export const FinalPage = ({ onComplete }: FinalPageProps) => {
  const scopedT = useScopedI18n("setup");
  const { projectData } = useFlowContext();
  const supabase = createClient();
  const router = useRouter();

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

  const infoItems = [
    {
      icon: <Icons.Github className="w-8 h-8" />,
      title: scopedT("connect_accounts"),
      description: scopedT("connect_accounts_description"),
    },
    {
      icon: <Icons.Database className="w-8 h-8" />,
      title: scopedT("data_referencing"),
      description: scopedT("data_referencing_description", {
        key: <Kbd>Cmd + K</Kbd>,
      }),
    },
    {
      icon: <Icons.Bot className="w-8 h-8" />,
      title: scopedT("ai_partner"),
      description: scopedT("ai_partner_description", {
        key: <Kbd>Cmd + K</Kbd>,
      }),
    },
  ];

  const handleEnterApp = async () => {
    if (projectData?.id) {
      try {
        const { error } = await supabase
          .from("projects")
          .update({ setup_flow_completed: true })
          .eq("id", projectData.id);

        if (error) {
          throw error;
        }

        toast.success(scopedT("setup_flow_completed"));
        onComplete();
      } catch (error) {
        console.error("Error updating project:", error);
        toast.error(scopedT("setup_flow_completion_error"));
      }
    } else {
      console.error("Project ID not found");
      toast.error(scopedT("project_not_found"));
      router.push("/");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 w-full h-full p-4 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Heading size="9">{scopedT("setup_complete")}</Heading>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="text-center max-w-2xl mx-auto">
          <Text size="3" className="text-gray-10">
            {scopedT("setup_complete_description", {
              key: <Kbd>Cmd + K</Kbd>,
            })}
          </Text>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-3 w-full bg-gray-a2 rounded-lg border border-outline-03 h-full max-h-[250px]"
      >
        {infoItems.map((item, index: number) => (
          <div
            key={`${item.title}-${index}`}
            className={clsx(
              "flex flex-col items-center justify-center text-center px-4 py-6",
              {
                "border-r border-outline-03": index !== infoItems.length - 1,
              },
            )}
          >
            {item.icon}
            <Text size="4" weight="medium" className="mt-3 mb-2">
              {item.title}
            </Text>
            <Text size="2" className="text-gray-10">
              {item.description}
            </Text>
          </div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button
          onClick={handleEnterApp}
          size="3"
          className="w-full max-w-[300px]"
        >
          {scopedT("enter_app")}
          <Icons.ArrowRight />
        </Button>
      </motion.div>
    </motion.div>
  );
};
