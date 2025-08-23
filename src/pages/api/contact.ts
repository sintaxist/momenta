import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    console.log("Datos recibidos:", data);

    const shouldFail = Math.random() < 0.2;

    if (shouldFail) {
      return new Response(JSON.stringify({ message: "Error simulado desde el servidor." }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: "Datos enviados con éxito!" }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ message: "El cuerpo de la solicitud no es JSON válido." }), { status: 400 });
  }
};