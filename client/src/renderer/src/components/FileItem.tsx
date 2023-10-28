import { useSnapshot } from 'valtio';
import { bytesToSize, compressFileName } from '@renderer/utils/utils';
import { BsFileEarmarkTextFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import state from '@renderer/store';
import Button from './Button';

export default function FileItem() {
  const snap = useSnapshot(state);
  const ipcRenderer = (window as any).ipcRenderer;

  const handleDelete = () => {
    state.files = [];
  };

  const handleVisualize = () => {
    state.isUploading = true;
    ipcRenderer.send('upload:data', { file: state.files[0].filePath });
  };

  return (
    <div className="w-full py-4 space-y-2 lg:py-0 relative  rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between bg-gray-200 drop-shadow-lg">
      <div className="flex gap-4 items-center">
        <span className="text-2xl text-sky-600">{<BsFileEarmarkTextFill />}</span>
        <div className="flex items-center gap-1 w-96">
          <span className="font-medium overflow-x-hidden ">
            {compressFileName(snap.files.length > 0 ? snap.files[0].name : '')}
          </span>
          <span className="text-gray-400 text-sm">
            ({bytesToSize(snap.files.length > 0 ? snap.files[0].size : 0)})
          </span>
        </div>
      </div>

      {snap.files.length > 0 && <Button title="Visualize" clickHandler={handleVisualize} />}

      <span
        className="cursor-pointer hover:bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center text-2xl text-gray-400"
        onClick={handleDelete}
      >
        <MdClose />
      </span>
    </div>
  );
}
