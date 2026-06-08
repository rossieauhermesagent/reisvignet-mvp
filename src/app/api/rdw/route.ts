import { NextResponse } from 'next/server';
import { getVehicleData } from '@/lib/rdw';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const plate = searchParams.get('plate');

  if (!plate) {
    return NextResponse.json({ error: 'Geen kenteken opgegeven' }, { status: 400 });
  }

  const data = await getVehicleData(plate);

  if (!data) {
    return NextResponse.json({ error: 'Voertuig niet gevonden' }, { status: 404 });
  }

  return NextResponse.json(data);
}
