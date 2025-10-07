import { Button, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-buildstrap";
import { createStyles } from "react-native-buildstrap/hook/CreateStyles";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={[styles.container, styles.bgToggle]}>
      <Text style={styles.textToggle}>Welcome to the Home Screen!</Text>
      <TouchableOpacity
        style={[styles.p1, styles.mt1, styles.bgInfo, styles.roundedCircle]}
        onPress={toggleTheme}
      >
        <Ionicons name="moon" style={[styles.fs3, styles.textLight]} />
      </TouchableOpacity>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
    </View>
  );
}
