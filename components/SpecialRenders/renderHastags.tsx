import { Text } from "react-native";

const handleHashtagPress = (hashtag: string) => {
    console.log(`Hashtag pressed: ${hashtag}`);
    // Add your desired functionality here
};

const renderBlueHashtags = (text: string) => {
    if (!text) {
        return null; // or return an empty component, depending on your use case
    }

    const lines = text.split('\n');

    return lines.map((line, lineIndex) => (
        <Text key={lineIndex}>
            {line.split(' ').map((word, index) => {
                if (word.startsWith('#')) {
                    return (
                        <Text
                            key={index}
                            style={{ color: 'blue', fontWeight: 'bold' }}
                            onPress={() => handleHashtagPress(word)}
                        >
                            {word}{' '}
                        </Text>
                    );
                }

                return <Text key={index}>{word} </Text>;
            })}
            {lineIndex < lines.length - 1 && <Text>{'\n'}</Text>}
        </Text>
    ));
};

export default renderBlueHashtags;
