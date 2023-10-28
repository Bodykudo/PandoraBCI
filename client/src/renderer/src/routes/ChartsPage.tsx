import { useState } from 'react';
import Charts from '@renderer/components/Charts';
import Logo from '@renderer/assets/logo2.png';
import Button from '@renderer/components/Button';
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillBackspaceFill } from 'react-icons/bs';
import { BiReset } from 'react-icons/bi';
import state from '@renderer/store';

export default function ChartsPage() {
  const [isPaused, setIsPaused] = useState(false);

  const handleGoBack = () => {
    state.isUploaded = false;
  };

  return (
    <div className="flex justify-center flex-col mt-4">
      <div className="flex flex-row self-center justify-between w-full max-w-6xl items-center gap-2">
        <img src={Logo} className="h-16" />
        <div className="flex items-center justify-center gap-2">
          <Button
            icon={BsFillBackspaceFill}
            clickHandler={handleGoBack}
            size="small"
            tooltipText="Go Back"
          />
          <Button
            icon={isPaused ? BsFillPlayCircleFill : BsFillPauseCircleFill}
            clickHandler={() => setIsPaused((pause) => !pause)}
            size="small"
            tooltipText={isPaused ? 'Play EEG Signal' : 'Pause EEG Signal'}
          />
          <Button
            icon={BiReset}
            clickHandler={() => setIsPaused((pause) => !pause)}
            size="small"
            tooltipText="Reset EEG Signal"
          />
        </div>
      </div>
      <Charts isPaused={isPaused} />
    </div>
  );
}
