import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { FC } from "react";
import { useState } from "react";

const TestDownloadButton: FC<{ href: string }> = ({ href, children }) => {
  const [disabled, setDisabled] = useState(false);

  const renderIcon = () => {
    return disabled ? <LoadingOutlined /> : <DownloadOutlined />;
  };

  const onClick = async () => {
    setDisabled(true);

    const a = document.createElement("a");
    a.hidden = true;
    a.click();
    a.remove();

    setDisabled(false);
  };

  return (
    <Button disabled={disabled} onClick={onClick}>
      {renderIcon()}
      {children}
    </Button>
  );
};

export default TestDownloadButton;
