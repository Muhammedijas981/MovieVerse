# MovieVerse 🎬

A React Native app that uses the TMDB API to help users discover and browse movies. This is my submission for the Buy Me a Coffee hiring challenge, built as a proof of concept to demonstrate React Native development practices.

> ⚠ Note: The TMDB API might be blocked in India. If you don't see any movies loading, you'll need to use a VPN. I couldn't switch to an alternative API since none offer features like movie search or trending movies.

## Table Of Contents

* [Design Choices](#design-choices)
   * [List Screen](#list-screen)
   * [Details Screen](#details-screen)
   * [Technical Decisions](#technical-decisions)
* [Implementation](#implementation)
   * [Core Requirements](#core-requirements)
   * [Additional Features](#additional-features)
* [Setup Guide](#setup-guide)
   * [Prerequisites](#prerequisites)
   * [Installation Steps](#installation-steps)

## Design Choices

### List Screen
The main screen uses a responsive card layout that adapts to different device sizes. On phones, it shows a single column with detailed movie information, while tablets display a grid to utilize the larger screen space.

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/00b27137-297a-4e2d-a19f-74247b5b3087" width="250"></td>
    <td><img src="https://github.com/user-attachments/assets/c00c769d-d946-448a-a79f-4f3af5165fbb" width="250"></td>
     <td><img src="https://github.com/user-attachments/assets/0e3ad7ae-1d1d-4351-8cc7-4e22040ef173" width="250"></td>
    <td><img src="https://github.com/user-attachments/assets/2d87a439-bb63-482e-9b95-1fcad133c8da" width="250"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/d4e95848-d8f1-460b-b421-4a7faf02dfd9" width="250"></td>
    <td><img src="https://github.com/user-attachments/assets/7dd511f7-bf08-4515-8fa7-ea8f86225c63" width="250"></td>
     <td><img src="https://github.com/user-attachments/assets/3442497e-3fed-4dc8-bbf3-0f9240b15b07" width="250"></td>
    <td><img src="https://github.com/user-attachments/assets/95e61986-4ed4-4098-a302-db194a6e571a" width="250"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/760eb837-539c-4145-b67b-884132fe83b7" width="250"></td>
    <td><img src="https://github.com/user-attachments/assets/0654d4a7-a07d-43a7-b959-b7faa28c0ef1" width="250"></td>
    <td"><img src="https://github.com/user-attachments/assets/afae33c6-aa58-490f-bb85-5dd23c12e138" width="250"></td>
  </tr>
  <tr>
  
  </tr>
</table>

Each movie card contains:
- Title and release year
- Rating displayed as a 5-star system (converted from TMDB's 10-point scale)
- Genre tags
- Popularity indicator using a simple progress bar

### Details Screen
A straightforward two-section layout that responds to device orientation:
- Portrait: Stacked layout with poster image on top and details below
- Landscape: Split view with poster on left and details on right
This simple approach works well across different screen sizes without overcomplicating the UI.

### Technical Decisions
- Used React Context instead of Redux for state management, keeping the app simple
- Implemented infinite scroll for better performance with large datasets
- Added local caching using AsyncStorage to improve app responsiveness
- Built with TypeScript for better code reliability
- Used Expo for faster development and easier testing

## Implementation

### Core Requirements
- Cross-platform compatibility (iOS & Android)
- Movie browsing with infinite scroll
- Search functionality
- Responsive layouts
- Dark/Light theme support
- Offline data caching

### Additional Features
- Real-time search with debounced API calls
- Multiple movie list filters (Upcoming, Now Playing, Top Rated)
- Favorite movies system
- Orientation-aware layouts
- Loading state indicators

## Setup Guide

### Prerequisites
1. Node.js & npm
2. Expo CLI
   bash
   npm install -g expo-cli
   
3. Android Studio (for Android development)
4. Xcode (for iOS development, macOS only)

### Installation Steps

1. *Get the code and install dependencies*
   bash
   git clone <repository-url>
   cd movieverse
   npm install
   

2. *Configure environment*
   Create a .env file in the project root:
   env
   EXPO_PUBLIC_BASE_URL=https://api.themoviedb.org/3
   EXPO_PUBLIC_AUTH_KEY=your_tmdb_api_key
   

3. *Start the app*
   bash
   npx expo start
   
   Use a for Android, i for iOS, or scan the QR code with Expo Go.

---

This is a challenge submission and won't be maintained. Feel free to use it as a reference for React Native development practices.
