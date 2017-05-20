# API Capstone Spec Sheet

## The Situation

Stuck in traffic? Have a commute and want to get music with a similar mood? We'l provide options for playlists! Future functionality include being able to select songs by time (milliseconds) requested so it'll end at the same time as your commute.

We will be using emojis (e.g happy, sad, excited, chill) to select a theme of playlists of songs.

## User Stories

* As a user, I must be able to select a mood emoji to display a list of public playlists fitting that emoji from Spotify. Once I select a playlist I want it will open up Spotify Web.

## Wireframe Details

1. Header
  * Time estimate: 1 minute
  * "SONGS FOR YOUR COMMUTE"
2. (Hidden) How long is your trip today?
  * Time estimate: 20 minutes
  * Let user input hour(s) and minutes converting it to milliseconds in a state mod
  * This is currently a hidden functionality that we may add in depending on time
3. Requesting user to ask for what they want
  * Time estimate: 1 hour
  * Let user click on an emoji (a button with the actual unicode emoji or a png of an emoji) to dictate what mood they are in for the type of music they want from spotify
4. Submit their request
  * Time estimate: 30 minutes
  * "Get me to my playlist!" button
5. Display the playlists
  * Time estimate: 2 hours
  * Display [x] amount of playlist results allowing the user to choose the playlist they wish to play from. This will redirect them to the Spotify Web App.