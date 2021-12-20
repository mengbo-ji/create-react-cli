import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { exitFullscreen, requestFullScreen } from 'utils/util';
import React, { FC, memo, useState } from 'react';

const Fullscreen: FC = () => {
  const [ isFull, setIsFull ] = useState(false);
  // 控制全屏
  const toggleFullScreen = (): void => {
    !isFull ? requestFullScreen() : exitFullscreen();
    setIsFull(!isFull);
  };

  return (
    <>
      {isFull
        ? <FullscreenExitOutlined style={{ fontSize: 20, color: '#fff' }} onClick={toggleFullScreen} />
        : <FullscreenOutlined style={{ fontSize: 20, color: '#fff' }} onClick={toggleFullScreen} />}

    </>
  );
};

export default memo(Fullscreen);
