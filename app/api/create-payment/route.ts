// src/app/api/create-payment/route.ts

import { NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid'; // <--- MUDANÇA IMPORTANTE AQUI

// Mapeamento de preços no back-end para segurança
const prices = {
  base: 47.00, // R$17,00 (em reais)
  whats: 37.90,
  insta: 17.00,
  facebook: 17.00,
  gps: 7.00,
}

export async function POST(request: Request) {
  try {
    const { selectedBumps, customer } = await request.json()

    if (!customer || !customer.name || !customer.email || !customer.document) {
        return NextResponse.json({ error: "Dados do cliente incompletos." }, { status: 400 });
    }

    let totalAmount = prices.base;
    const items = [{
      id: "relatorio-principal",
      title: "Relatório Completo SigiloX",
      description: "Acesso completo ao relatório de investigação.",
      price: prices.base,
      quantity: 1,
      is_physical: false,
    }];

    for (const bumpId of selectedBumps) {
      const price = prices[bumpId as keyof typeof prices];
      if (price) {
        totalAmount += price;
        items.push({
          id: bumpId,
          title: `${bumpId.charAt(0).toUpperCase() + bumpId.slice(1)} Check`,
          description: `Ferramenta adicional de espionagem.`,
          price: price,
          quantity: 1,
          is_physical: false,
        });
      }
    }

    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    const liraPayPayload = {
      external_id: uuidv4(), // <--- MUDANÇA IMPORTANTE AQUI
      total_amount: parseFloat(totalAmount.toFixed(2)), // Garante que o total tenha 2 casas decimais
      payment_method: "PIX",
      webhook_url: "https://tinderchecks.online/api/webhook", // Lembre-se de trocar esta URL
      items: items,
      ip: ip,
      customer: {
        name: customer.name,
        email: customer.email,
        document_type: "CPF",
        document: customer.document,
      },
    }

    const response = await fetch("https://api.lirapaybr.com/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-secret": `${process.env.LIRAPAY_API_KEY}`,
      },
      body: JSON.stringify(liraPayPayload),
    });

    const data = await response.json();

    if (!response.ok || data.hasError) {
      console.error("Erro retornado pela LiraPay:", data);
      return NextResponse.json({ error: "Falha ao criar a transação na LiraPay", details: data.error || data }, { status: response.status });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Erro interno do servidor ao processar pagamento:", error);
    return NextResponse.json({ error: "Ocorreu um erro inesperado no servidor." }, { status: 500 });
  }
}
