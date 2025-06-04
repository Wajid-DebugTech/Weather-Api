// Weather work

import React,{ useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Image } from 'react-native';
import { Text, View } from '../../components/Themed';
import axios from "axios";

export default function Weather() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");
  
    const API_KEY = "28a9a4ad4608afddfb0ac87bb06d31ac"; 
  
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
  
        console.log("🚀 ~ fetchWeather ~ response.data:", response.data)
        setWeatherData(response.data);
        setError(""); // Clear previous errors
      } catch (err) {
        setError("City not found. Please try again.");
        setWeatherData(null);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>DebugTech Weather App</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Get Weather" onPress={fetchWeather} />
  
        {error ? <Text style={styles.error}>{error}</Text> : null}
  
        {weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.cityName}>{weatherData.name}</Text>
            <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
            <Text>Humidity: {weatherData.main.humidity}%</Text>
            <Text>Condition: {weatherData.weather[0].description}</Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
              }}
              style={styles.weatherIcon}
            />
          </View>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      backgroundColor: "#f0f0f0",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      width: "100%",
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: "#fff",
    },
    error: {
      color: "red",
      marginTop: 10,
    },
    weatherContainer: {
      alignItems: "center",
      marginTop: 20,
      padding: 20,
      borderRadius: 10,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cityName: {
      fontSize: 22,
      fontWeight: "bold",
    },
    temp: {
      fontSize: 20,
      marginVertical: 5,
    },
    weatherIcon: {
      width: 80,
      height: 80,
      marginTop: 10,
    },
  });