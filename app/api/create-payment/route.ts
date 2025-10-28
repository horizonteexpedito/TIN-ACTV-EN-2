// src/app/api/create-payment/route.ts

import { NextResponse } from "next/server"

// Mapeamento de preços no back-end para segurança
const prices = {
  base: 1700, // R$17,00 em centavos
  whats: 1990,
  insta: 1990,
  facebook: 1990,
  gps: 2490,
}

export async function POST(request: Request) {
  try {
    const { selectedBumps, customer } = await request.json()

    if (!customer || !customer.name || !customer.email || !customer.document) {
        return NextResponse.json({ error: "Dados do cliente incompletos." }, { status: 400 });
    }

    let totalAmount = prices.base
    const items = [{
      name: "Relatório Completo SigiloX",
      quantity: 1,
      unit_price: prices.base,
    }]

    for (const bumpId of selectedBumps) {
      if (prices[bumpId as keyof typeof prices]) {
        totalAmount += prices[bumpId as keyof typeof prices]
        items.push({
          name: `${bumpId.charAt(0).toUpperCase() + bumpId.slice(1)} Check`,
          quantity: 1,
          unit_price: prices[bumpId as keyof typeof prices],
        })
      }
    }

    const liraPayPayload = {
      amount: totalAmount,
      payment_method: "pix",
      currency: "BRL",
      customer: {
        name: customer.name,
        email: customer.email,
        document: customer.document,
      },
      items: items,
    }

    const response = await fetch("https://api.lirapaybr.com/v1/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LIRAPAY_API_KEY}`,
      },
      body: JSON.stringify(liraPayPayload),
    })

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro da LiraPay:", data);
      return NextResponse.json({ error: "Falha ao criar o pagamento na LiraPay", details: data }, { status: response.status });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Erro interno do servidor:", error);
    return NextResponse.json({ error: "Ocorreu um erro inesperado." }, { status: 500 });
  }
}
