import { useState } from "react";

const useModal = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((visible) => !visible);
  };

  return { visible, toggleVisible };
};

export default useModal;
