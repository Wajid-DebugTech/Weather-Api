import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const API_KEY = "YOUR_OPENWEATHER_API_KEY";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (response.ok) {
        setWeather({
          temperature: data.main.temp,
          humidity: data.main.humidity,
          condition: data.weather[0].description,
        });
        setError(null);
      } else {
        setError("City not found");
        setWeather(null);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeather(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={fetchWeather} />
      {error && <Text style={styles.error}>{error}</Text>}
      {weather && (
        <View style={styles.result}>
          <Text>Temperature: {weather.temperature}°C</Text>
          <Text>Humidity: {weather.humidity}%</Text>
          <Text>Condition: {weather.condition}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "80%", borderBottomWidth: 1, marginBottom: 10, padding: 8, textAlign: "center" },
  error: { color: "red", marginTop: 10 },
  result: { marginTop: 20, alignItems: "center" },
});

export default Weather;
