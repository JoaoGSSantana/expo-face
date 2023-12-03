import { StyleSheet, View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Camera } from 'expo-camera';

import {CameraType, FaceDetectionResult} from 'expo-camera/build/Camera.types'

import * as FaceDetector from 'expo-face-detector';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  console.log(permission)

function handleFacesDetected({faces}: FaceDetectionResult) {
  if(faces.length === 0) {
    console.log('No faces detected');
  }else {
    faces.map((value, index) => {
      const face = value as FaceDetector.FaceFeature;

      console.log(face)
    })
  }
}

if (!permission) {
  // Camera permissions are still loading
  return <View />;
}

if (!permission.granted) {
  // Camera permissions are not granted yet
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
      <Button onPress={requestPermission} title="grant permission" />
    </View>
  );
}

  return (
    <View style={styles.container}>
    <Camera
    style={styles.camera}
    ratio="16:9" 
    type={CameraType.front}
    onFacesDetected={({faces}) => {
      if(faces.length === 0) {
        console.log('No faces detected');
      }else {
        faces.map((value, index) => {
          const face = value as FaceDetector.FaceFeature;
    
          console.log(face.smilingProbability)
        })
      }
    }}
    faceDetectorSettings={{
      mode: FaceDetector.FaceDetectorMode.fast,
      detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
      runClassifications: FaceDetector.FaceDetectorClassifications.all,
      minDetectionInterval: 100,
      tracking: true,
    }}
  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1
  }
});
