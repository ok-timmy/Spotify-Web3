# Spotify-Starter

- Use IPFS to allow users to upload their own playlist
- People should subscribe with an amount of ETH (depending on the subscription they make) before being allowed to stream any album
- The subscriptions list should include
- i) Bronze Plan - 0.005 ETH - Maximum of 10 albums per month + 10% of the subscription fee (which will go to me that created the app) ==== 0.0055 ETH
- ii) Silver Plan - 0.025 ETH - Maximum of 50 albums per month + 10% of the subscription fee (which will go to me that created the app) ==== 0.0275 ETH
- iii) Gold Plan - 0.05 ETH - Maximum of 100 albums per month + 10% of the subscription fee (which will go to me that created the app) ==== 0.055 ETH
- People who create a playlist should be paid 1/100 of the price the subscribers subscription fee
- People who create a playlist should pay a fee of 0.00015 ETH which should go to me that created the app)

- Uploading playlist should be in this format
- {
    title, name, Category(Album/Playlist), Genre(hip-hop, gospel, R&B, Jazz, Rap, Soul, Country Music, Electronic, Blues, Afro, Mixed ), Songs(- Should be an array
    Should only accept .mp3, .aac), Album/Playlist cover image, Author of playlist/ Album, Release date, Rating
- }

- For Frontend
- You should be able to play any album you want as long as you have subscribed
- You should be able to able to upload albums/playlist
- You should be able to search for an album/playlist
- You should be able to add it to your list of favourite albums/Playlist
