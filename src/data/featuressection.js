import * as Icons from "@/components/ui/Icons.ts";


function optimizeCloudinaryUrl(url, width = 700) {
  try {
    const parts = url.split("/upload/");
    if (parts.length !== 2) return url;
    return `${parts[0]}/upload/c_fit,w_${width},f_webp/${parts[1]}`;
  } catch {
    return url;
  }
}

export const features = [
  {
    id: 1,
    icon: Icons.Sparkles,
    title: "Diseño Personalizado",
    description:
      "Cada invitación refleja el <strong>estilo</strong> y la <strong>esencia</strong> de tu celebración con colores, tipografía y detalles únicos.",
    image: optimizeCloudinaryUrl("https://res.cloudinary.com/dxdysqkbg/image/upload/v1756227582/Astom-Summit-1_t4ta0t.jpg"),
  },
  {
    id: 2,
    icon: Icons.Mail,
    title: "RSVP Inteligente",
    description:
      "Confirmaciones en línea con <strong>control de invitados</strong>, validación por familia y <strong>notificaciones automáticas</strong>.",
    image: optimizeCloudinaryUrl("https://res.cloudinary.com/dxdysqkbg/image/upload/v1756573850/Captura_de_pantalla_2025-08-30_a_la_s_11.10.37_a.m._hlb7ct.png"),
  },
  {
    id: 3,
    icon: Icons.Calendar,
    title: "Experiencia Completa",
    description:
      "Incluye <strong>itinerario</strong>, ubicación en mapas, <strong>código de vestimenta</strong> y la opción de agregar al calendario en un solo clic.",
    image: optimizeCloudinaryUrl("https://res.cloudinary.com/dxdysqkbg/image/upload/v1756573725/Captura_de_pantalla_2025-08-30_a_la_s_11.06.22_a.m._apulhv.png"),
  },
  {
    id: 4,
    icon: Icons.Gallery,
    title: "Galería Interactiva",
    description:
      "<strong>Fotos y videos</strong> con animaciones modernas, opción de <strong>subida en tiempo real</strong> y recuerdos compartidos.",
    image: optimizeCloudinaryUrl("https://res.cloudinary.com/dxdysqkbg/image/upload/v1756227626/Contecon-3_s7jwnr.jpg"),
  },
  {
    id: 5,
    icon: Icons.Gift,
    title: "Mesa de Regalos & Extras",
    description:
"<strong>Playlist colaborativa</strong>, mesa de regalos, hospedajes recomendados y secciones exclusivas para tus invitados.",
    image: optimizeCloudinaryUrl("https://res.cloudinary.com/dxdysqkbg/image/upload/v1756573731/Captura_de_pantalla_2025-08-30_a_la_s_11.07.12_a.m._g7klwh.png"),
  },
  {
    id: 6,
    icon: Icons.Support,
    title: "Soporte Dedicado",
    description:
      "Acompañamiento <strong>continuo</strong> antes y durante el evento, asegurando que todo fluya <strong>sin estrés</strong>.",
    image: optimizeCloudinaryUrl("https://res.cloudinary.com/dxdysqkbg/image/upload/v1756527566/Open_graph_vyig32.png"),
  }
];
