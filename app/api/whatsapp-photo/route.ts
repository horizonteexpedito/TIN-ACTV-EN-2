import { type NextRequest, NextResponse } from "next/server";

// Cache em memória para evitar chamadas repetidas à API
const cache = new Map<string, { result: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export async function POST(request: NextRequest) {
  // Imagem de fallback caso tudo falhe
  const fallbackPayload = {
    success: true,
    result: "https://i.postimg.cc/gcNd6QBM/img1.jpg",
    is_photo_private: true,
  };

  try {
    // 1. RECEBER APENAS O NÚMERO DE TELEFONE JÁ FORMATADO
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
    
    // O número já vem limpo do frontend, então usamos diretamente
    const fullPhone = phone;

    // 2. VERIFICAR O CACHE
    const cached = cache.get(fullPhone);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log("[v0] Returning cached WhatsApp photo for:", fullPhone);
      return NextResponse.json(
        { success: true, result: cached.result, is_photo_private: false },
        { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // 3. CHAMAR A API EXTERNA
    const urlProfile = `https://whatsapp-profile-pic.p.rapidapi.com/isbiz?phone=${fullPhone}`;

    const response = await fetch(urlProfile, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f74236b7e6msh8ca93f03154347cp11c3bfjsn68a073735bf1", // Sua chave da RapidAPI
        "X-RapidAPI-Host": "whatsapp-profile-pic.p.rapidapi.com",
      },
      signal: AbortSignal.timeout?.(10_000), // Timeout de 10 segundos
    });

    if (response.status === 429) {
      console.log("[v0] Rate limit exceeded, returning fallback");
      return NextResponse.json(fallbackPayload, { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
    }

    if (!response.ok) {
      console.error("[v0] RapidAPI returned status:", response.status);
      return NextResponse.json(fallbackPayload, { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
    }

    const responseText = await response.text();
    
    // Se a resposta for vazia ou inválida, retorna o fallback
    if (!responseText || !responseText.trim().startsWith("https://")) {
      console.log("[v0] Invalid or empty response from RapidAPI, returning fallback");
      return NextResponse.json(fallbackPayload, { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
    }

    const resultUrl = responseText.trim();

    // 4. GUARDAR O RESULTADO NO CACHE
    cache.set(fullPhone, { result: resultUrl, timestamp: Date.now() });

    // Limpeza de cache antigo
    if (cache.size > 100) {
      const oldestKey = Array.from(cache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp)[0][0];
      cache.delete(oldestKey);
    }

    // 5. RETORNAR SUCESSO
    return NextResponse.json(
      { success: true, result: resultUrl, is_photo_private: false },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );

  } catch (err) {
    console.error("[v0] Error fetching WhatsApp photo:", err);
    return NextResponse.json(fallbackPayload, { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
