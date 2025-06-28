import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, PaperProvider, Text } from 'react-native-paper';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

export default function HomeScreen() {
  return (
    <PaperProvider
      settings={{
        icon: (props: any) => <Ionicons {...props} />,
      }}
    >
      <View>
        <ThemedView style={styles.titleContainer}>
          <Button
            icon={'camera'}
            mode="contained"
            onPress={() => console.log('Pressed')}
          >
            Press me
          </Button>

          <Card>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Content>
              <Text variant="titleLarge">Mari oli</Text>
              <Text variant="bodyMedium">Siin</Text>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>Mingi teine koht</ThemedText>
        </ThemedView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
