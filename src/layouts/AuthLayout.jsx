import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../animations/pageTransitions";

const AuthLayout = ({ title, children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="w-[420px] bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          {title}
        </h2>
        {children}
      </div>
    </motion.div>
  );
};

export default AuthLayout;
