import * as Icons from "@/components/ui/Icons.ts";

export const packages = [
  {
    id: 1,
    name: "Esencial",
    icon: Icons.Sparkles,
    originalPrice: "$6,900",
    discountedPrice: "$5,520",
    savings: "$1,380",
    description:
      "Ideal para quien busca una invitación digital elegante y funcional.",
    features: [
      "Invitación digital personalizada (colores y tipografía)",
      "RSVP sencillo con base de datos",
      "Confirmación automática por correo",
      "Itinerario, ubicación en mapas y código de vestimenta",
      "Agregar al calendario (Google, Apple, Outlook)",
      "Galería con modal",
      "Música personalizada",
      "OpenGraph y Favicon personalizados"
    ],
    popular: false
  },
  {
    id: 2,
    name: "Premium",
    icon: Icons.Crown,
    originalPrice: "$12,500",
    discountedPrice: "$10,000",
    savings: "$2,500",
    description:
      "El equilibrio perfecto entre estilo y tecnología.",
    features: [
      "Todo lo del Esencial",
      "Invitación 100% animada y conteo regresivo",
      "RSVP avanzado con validación y control por familia",
      "Boletos PDF personalizados con QR",
      "Lista de espera de invitados",
      "Mesa de regalos y playlist colaborativa de Spotify",
      "Galería avanzada y subida de fotos en tiempo real",
      "Nuestra historia y mensajes de familiares",
      "Lista de hospedajes recomendados",
      "Mails personalizados en formularios",
      "Botones de contacto y links a redes sociales",
      "Soporte continuo hasta el evento"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Luxury",
    icon: Icons.Star,
    originalPrice: "$25,000",
    discountedPrice: "$20,000",
    savings: "$5,000",
    description:
      "Experiencia a medida con diseño 100% personalizado.",
    features: [
      "Todo lo del Premium",
      "Diseño invitación 100% a medida",
      "Fondos y tipografía personalizados",
      "Login con correo (acceso restringido)",
      "Dashboard: confirmaciones, mensajes y pendientes",
      "Descarga de lista de invitados en Excel",
      "Boletos Apple Wallet y Google Wallet",
      "Hashtag del evento y sección social",
      "Internacionalización (1+ idiomas)",
      "Animaciones y efectos especiales (partículas, transiciones)",
      "Recomendaciones turísticas personalizadas",
      "Consultor dedicado y soporte hasta el evento"
    ],
    popular: false
  }
];
