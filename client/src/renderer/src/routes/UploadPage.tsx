import Dropzone from '@renderer/components/Dropzone';
import Logo from '../assets/logo.png';
import FileItem from '@renderer/components/FileItem';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import state from '@renderer/store';
import LoadingModal from '@renderer/components/LoadingModal';
import { Dataset } from '@renderer/utils/types';

export default function UploadPage() {
  const ipcRenderer = (window as any).ipcRenderer;
  const snap = useSnapshot(state);

  useEffect(() => {
    ipcRenderer.on('upload:done', (event: any) => {
      state.isUploading = false;
      if (event?.data?.data) {
        const outputData = JSON.parse(event.data.data) as Dataset;
        const allYValuesFiltered = outputData['filtered'].flatMap((series) =>
          series.data.map((point) => point.y)
        );
        const maxYFiltered = Math.max(...allYValuesFiltered);
        const minYFiltered = Math.min(...allYValuesFiltered);
        state.boundaries.filtered = { max: maxYFiltered + 10, min: minYFiltered - 10 };

        const allYValuesUnfiltered = outputData['unfiltered'].flatMap((series) =>
          series.data.map((point) => point.y)
        );
        console.log(`Maximum Y Filtered: ${maxYFiltered}`);
        console.log(`Minimum Y Filtered: ${minYFiltered}`);
        const maxYUnfiltered = Math.max(...allYValuesUnfiltered);
        const minYUnfiltered = Math.min(...allYValuesUnfiltered);
        console.log(`Maximum Y Unfiltered: ${maxYUnfiltered}`);
        console.log(`Minimum Y Unfiltered: ${minYUnfiltered}`);
        state.boundaries.unfiltered = { max: maxYUnfiltered + 10, min: minYUnfiltered - 10 };

        state.id++;
        state.data = outputData;
        state.isUploaded = true;
      }
    });
  }, []);

  return (
    <>
      {snap.isUploading && <LoadingModal />}

      <div className="flex flex-col max-w-6xl overflow-x-hidden px-4 md:max-w-5xl mx-auto justify-center gap-8 h-screen">
        <img src={Logo} className="w-28 md:w-40 self-center" />
        <div className="flex flex-col gap-4">
          <Dropzone />
          <FileItem />
        </div>
      </div>
    </>
  );
}
