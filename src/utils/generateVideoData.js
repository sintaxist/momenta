/**
 * Convierte un link embed de Cloudinary a un objeto con MP4, HLS y poster
 * @param {string} embedUrl - Link embed de Cloudinary
 * @param {string} title - Título del video
 * @param {string} demoUrl - URL de demo opcional
 * @returns {object} Objeto listo para videoData
 */
function generateVideoData(embedUrl, title, demoUrl = "#") {
  // Extraer cloud_name y public_id del embed
  const urlParams = new URL(embedUrl).searchParams;
  const cloudName = urlParams.get("cloud_name");
  const publicId = urlParams.get("public_id");

  return {
    title: title,
    video: {
      hls: `https://res.cloudinary.com/${cloudName}/video/upload/sp_auto/${publicId}.m3u8`,
      mp4: `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${publicId}.mp4`
    },
    poster: `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/so_2/${publicId}.jpg`,
    demoUrl: demoUrl
  };
}

// Ejemplo de uso con tus links
const embeds = [
  { url: "https://player.cloudinary.com/embed/?cloud_name=dxdysqkbg&public_id=Boda_Roma_dzutt9&profile=cld-looping", title: "Boda Roma" },
  { url: "https://player.cloudinary.com/embed/?cloud_name=dxdysqkbg&public_id=Astom_Summit_nqc5qo&profile=cld-looping", title: "Astom Summit 2024" },
  { url: "https://player.cloudinary.com/embed/?cloud_name=dxdysqkbg&public_id=Jimena_y_Canek_formz5&profile=cld-looping", title: "Boda Jimena y Canek" }
];

const videoData = embeds.map(e => generateVideoData(e.url, e.title));

console.log(videoData);
