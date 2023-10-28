import { useTypewriter } from 'react-simple-typewriter';

export default function LoadingModal() {
  const [text] = useTypewriter({
    words: [
      'Uploading your file...',
      'Reading the data...',
      'Analayzing the results...',
      'AI is predicting...',
      'Delivering the results...',
      "We're almost ready!"
    ],
    loop: false,
    typeSpeed: 40,
    deleteSpeed: 40,
    delaySpeed: 500
  });

  return (
    <div>
      <div
        className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center"
        style={{ background: 'rgba(0, 0, 0, 0.3)' }}
      >
        <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
          <div className="loader-dots block relative w-20 h-5 mt-2">
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
          </div>
          <div className="text-gray-500 text-md font-medium mt-2 text-center">{text}</div>
        </div>
      </div>
    </div>
  );
}
