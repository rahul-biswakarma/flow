import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import styles from './right-panel.module.css';

export const RightPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && <motion.div className={styles.rightPanelContainer}>Right Panel</motion.div>}
    </AnimatePresence>
  );
};
