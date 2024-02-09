import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Appearance, View } from "react-native";
import globalStyles from "./globalStyles";
import Home from "./pages/Home";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={globalStyles.androidSafeArea}>
        <Home></Home>
        <StatusBar style="auto" />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
