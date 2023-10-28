import { useSnapshot } from 'valtio';
import state from './store';
import UploadPage from './routes/UploadPage';
import ChartsPage from './routes/ChartsPage';

function App() {
  const snap = useSnapshot(state);

  return snap.isUploaded ? <ChartsPage /> : <UploadPage />;
}

export default App;
