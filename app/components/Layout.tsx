import { ReactNode } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#eee',
  },
});
