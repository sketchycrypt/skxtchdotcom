import { USERNAME, APIKEY } from '$env/static/private';

export async function load({ fetch, setHeaders }) {
    setHeaders({
        'Cache-Control': 'no-cache, max-age=0'
    });

    try {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${APIKEY}&format=json&t=${Date.now()}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const data = await response.json();
        const track = data.recenttracks?.track?.[0];
        
        return {
            nowPlaying: track ? {
                song: track.name,
                artist: track.artist['#text'],
                isNowPlaying: track['@attr']?.nowplaying === 'true',
                links: {
                    spotifyTrack: `https://open.spotify.com/search/${encodeURIComponent(track.name)}%20${encodeURIComponent(track.artist['#text'])}`,
                    spotifyArtist: `https://open.spotify.com/search/${encodeURIComponent(track.artist['#text'])}`
                },
                timestamp: Date.now()
            } : null
        };
    } catch (error) {
        console.error('Last.fm API Error:', error);
        return {
            nowPlaying: null,
            error: 'Failed to load current track'
        };
    }
}