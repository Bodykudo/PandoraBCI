import state from '@renderer/store';
import RealtimeChart from './RealTimeChart';
import { useSnapshot } from 'valtio';

interface Props {
  isPaused: boolean;
}

export default function Charts({ isPaused }: Props) {
  const snap = useSnapshot(state);

  return (
    <div id="eeg-chart" className="space-y-4 mb-4">
      <RealtimeChart
        id={`unfiltered_${snap.id}`}
        title="Unfiltered EEG"
        group={`eeg_${snap.id}`}
        height={350}
        isPaused={isPaused}
        filtered={false}
      />
      <RealtimeChart
        id={`filtered_${snap.id}`}
        title="Filtered EEG"
        group={`eeg_${snap.id}`}
        height={350}
        isPaused={isPaused}
        filtered={true}
      />
    </div>
  );
}
