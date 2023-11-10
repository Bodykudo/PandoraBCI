import * as DocumentPicker from 'expo-document-picker';
import { RectButton } from './Button';

interface Props {
  title: string;
  handleFile: (result: DocumentPicker.DocumentPickerResult) => void;
}

const FilePicker = ({ title, handleFile }: Props) => {
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'text/csv',
    });
    handleFile(result);
  };

  return (
    <RectButton
      minWidth={240}
      fontSize={14}
      handlePress={pickDocument}
      title={title}
    />
  );
};

export default FilePicker;
