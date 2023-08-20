// Image.js
import React from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Container, Button, Image, Avatar, Text, Center } from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomImage = ({ url, onChangePhoto }) => {
  // Function to handle the photo button press
  const handlePhotoBtnPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      onChangePhoto(result.uri);
    }
  };

  return (
<Container style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
  <View style={{ position: "relative" }}>
    {/* Display the selected image or the default gray avatar */}
    {url ? (
      <Avatar
        source={{ uri: url }}
        style={{ width: 100, height: 100, borderRadius: 75, alignSelf: 'center', marginTop: 20}}
      />
    ) : (
      <Avatar
        source={require('./img/default_profile.png')}
        style={{ width: 100, height: 100, borderRadius: 75, alignSelf: 'center', marginTop: 20}}
      />
    )}

    {/* Button to choose a photo */}
    <Button
      onPress={handlePhotoBtnPress}
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
      }}
    >
      <Icon
        name="camera-alt"
        style={{ fontSize: 20, textAlign: "center", position: "sticky" }}
      />
    </Button>
  </View>
</Container>

  );
};

export default CustomImage;
