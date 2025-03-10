const SpotifyPlayer = ({ spotifyUrl }) => {
  const videoId =
    spotifyUrl.split("v=")[1]?.split("&")[0] || spotifyUrl.split("/").pop();
  if (!videoId) return <p>Invalid YouTube URL</p>;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  return (
    <div className="flex justify-center items-center">
      <iframe
        width="100%"
        height="315"
        src={embedUrl}
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

const getTrackId = (url) => {
  console.log(url, "url");
  return url.split("/track/")[1]?.split("?")[0]; // Extract track ID
};

export default SpotifyPlayer;
