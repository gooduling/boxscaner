/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const App: () => Node = () => {
  const [ocrElements, setOcrElements] = useState([]);
  const textRecognized = ({textBlocks}) => {
    const textArray = [];
    textBlocks.forEach(textBlock => {
      textBlock.components.forEach(textLine => {
        textArray.push({
          bounds: textLine.bounds,
          text: textLine.value,
        });
      });
    });
    setOcrElements(textArray);
  };

  const renderOcrElement = element => {
    return (
      <View style={styles.textElement(element)}>
        <Text>{element.text}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        style={{flex: 1}}
        onTextRecognized={textRecognized}
        captureAudio={false}>
        {ocrElements?.map(element => renderOcrElement(element))}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
  textElement: el => ({
    borderWidth: 1,
    borderColor: 'blue',
    position: 'absolute',
    left: 0,
    top: el.bounds.origin.y,
    right: 0,
    bottom: 50,
  }),
});

export default App;
