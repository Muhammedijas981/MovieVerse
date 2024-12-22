# MovieVerse 🎬

This is my submission for the React Native Developer position at Buy Me a Coffee. The assignment demonstrates my ability to create a modern, performant mobile application using React Native and industry best practices.

## 🎯 Project Overview

MovieVerse is a movie discovery app powered by the TMDB API that allows users to:
- Browse trending and upcoming movies
- Search and filter movies
- Save favorites for later viewing
- View detailed movie information
- Switch between dark/light themes

## ✨ Features

- 🔍 Search through vast movie database
- 🌙 Dark/Light mode support
- 📱 Responsive design for both phones and tablets
- 🔄 Infinite scroll for seamless browsing
- ⭐ Save favorite movies
- 📊 Movie ratings and popularity metrics
- 🎨 Beautiful, native UI components
- 🔋 Efficient data caching

## 🛠️ Tech Stack

- React Native with Expo
- TypeScript for type safety
- TMDB API for movie data
- NativeWind for styling
- Expo Router for navigation
- AsyncStorage for local data persistence

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Git
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movieverse.git
   cd movieverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you use yarn
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_BASE_URL=https://api.themoviedb.org/3
   EXPO_PUBLIC_AUTH_KEY=your_tmdb_api_key
   ```
   > Note: You'll need to get an API key from [TMDB](https://www.themoviedb.org/settings/api)

4. **Setup development environment**
   - For Android:
     ```bash
     # Start Android Studio and open an emulator
     npm run android
     ```
   - For iOS (macOS only):
     ```bash
     cd ios && pod install && cd ..
     npm run ios
     ```

5. **Start the development server**
   ```bash
   npx expo start
   ```
   Then:
   - Press `a` for Android
   - Press `i` for iOS
   - Scan QR code with Expo Go app on your physical device

## 📱 App Structure

- **Home Screen**: Browse trending and upcoming movies
- **Search**: Find specific movies with instant search
- **Movie Details**: View comprehensive movie information
- **Favorites**: Access your saved movies

## 🎯 Key Features Explained

### Movie Discovery
- Browse through different categories: Trending, Now Playing, and Upcoming
- Smooth infinite scroll for continuous browsing
- Quick search with debounced API calls

### User Experience
- Responsive layout adapting to different screen sizes
- Smooth transitions and loading states
- Offline support with data caching
- Cross-platform compatibility (iOS & Android)

### Performance
- Efficient data fetching and caching
- Optimized image loading
- Minimal app size

## 🤝 Contributing

This is an assignment project, but feedback and suggestions are welcome! Feel free to open issues for any bugs or improvements you spot.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

- TMDB API for providing the movie data
- Expo team for the amazing development platform
- Buy Me a Coffee team for the opportunity
