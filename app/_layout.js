import { Stack } from "expo-router";

export default function Layout() {
  return <Stack 
  initialRouteName="index"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        title : 'ddd',
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      />;
}