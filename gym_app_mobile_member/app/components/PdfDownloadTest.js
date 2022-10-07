import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const PdfDownloadTest = (props) => {
  const fileUri = "http://www.pdf995.com/samples/pdf.pdf";

  const saveFile = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      FileSystem.downloadAsync(fileUri, FileSystem.documentDirectory, test.pdf)
        .then(async ({ uri }) => {
          await MediaLibrary.createAssetAsync(uri);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Create PDF" onPress={() => saveFile()} />{" "}
    </View>
  );
};

export default PdfDownloadTest;
