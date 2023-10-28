import { useEffect, useRef, useState } from 'react';
import { LuFileSymlink } from 'react-icons/lu';
import { FiUploadCloud } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import state from '@renderer/store';

export default function Dropzone() {
  const [isHover, setIsHover] = useState(false);
  const dropArea = useRef<HTMLLabelElement>(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    state.files = [
      {
        name: file.name,
        size: file.size,
        filePath: file.path
      }
    ];
  };

  useEffect(() => {
    const dropAreaElement = dropArea.current;

    if (dropAreaElement) {
      dropAreaElement.addEventListener('dragover', handleDragOver);
      dropAreaElement.addEventListener('dragleave', handleDragLeave);
      dropAreaElement.addEventListener('drop', handleDrop);
    }

    return () => {
      if (dropAreaElement) {
        dropAreaElement.removeEventListener('dragover', handleDragOver);
        dropAreaElement.removeEventListener('dragleave', handleDragLeave);
        dropAreaElement.removeEventListener('drop', handleDrop);
      }
    };
  }, []);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHover(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHover(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHover(false);
    if (e.dataTransfer) {
      const { files } = e.dataTransfer;
      if (files.length > 1) {
        toast.error('You can only upload 1 file.');
        return;
      }

      if (files[0].type !== 'text/csv') {
        toast.error('Unsupported file, please upload only CSV files.');
        return;
      }

      state.files = [
        {
          name: files[0].name,
          size: files[0].size,
          filePath: files[0].path
        }
      ];
    }
  };

  return (
    <div>
      <label
        ref={dropArea}
        htmlFor="poster"
        className={`relative hover:bg-gray-300 transition-all duration-300 h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-2 border-dashed cursor-pointer flex items-center justify-center  border-gray-400 outline-none ${
          isHover ? 'bg-gray-300' : 'bg-gray-300/70'
        }`}
      >
        <input
          id="file"
          type="file"
          name="file"
          accept=".csv"
          onChange={handleUpload}
          className="absolute z-30 cursor-pointer opacity-0 w-full h-full"
        />
        <div className="space-y-4 text-gray-500 ">
          {isHover ? (
            <div className="flex flex-col gap-6">
              <div className="justify-center flex text-6xl">
                <LuFileSymlink />
              </div>
              <h3 className="text-center font-medium text-2xl">Yes, right there</h3>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="justify-center flex text-6xl">
                <FiUploadCloud />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-center font-medium text-2xl">Click, or drop your files here</h3>
                <p className="text-center font-medium text-sm">Allowed Files: CSV Files</p>
              </div>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}
