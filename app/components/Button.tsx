import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  imgUrl?: any;
  text?: string;
  handlePress: any;
}

export function CircleButton({ imgUrl, text, handlePress, ...props }: Props) {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        position: 'absolute',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#74858C',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        ...props,
      }}
      onPress={handlePress}
    >
      {imgUrl && (
        <Image
          source={imgUrl}
          resizeMode='contain'
          style={{ width: 24, height: 24 }}
        />
      )}
      {text && <Text>{text}</Text>}
    </TouchableOpacity>
  );
}

interface RectProps {
  minWidth: number;
  fontSize: number;
  handlePress: any;
  title: string;
}

export function RectButton({
  minWidth,
  fontSize,
  handlePress,
  title,
  ...props
}: RectProps) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#001F2D',
        borderRadius: 24,
        minWidth,
        padding: 12,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          fontSize,
          color: '#fff',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
