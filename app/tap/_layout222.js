import { Stack } from "expo-router";

export default function Layout() {
  return <Stack 
  initialRouteName="index"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        title : 'with-pet',
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      />;
}