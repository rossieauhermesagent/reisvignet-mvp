export async function getVehicleData(licensePlate: string) {
  const cleanPlate = licensePlate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  
  try {
    // 1. Haal basisgegevens op (Merk, Model, Bouwjaar)
    const vehicleRes = await fetch(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${cleanPlate}`);
    const vehicleData = await vehicleRes.json();
    
    if (!vehicleData || vehicleData.length === 0) {
      return null;
    }
    
    // 2. Haal brandstofgegevens op (Brandstof omschrijving zit in een aparte dataset)
    const fuelRes = await fetch(`https://opendata.rdw.nl/resource/8ys7-d773.json?kenteken=${cleanPlate}`);
    const fuelData = await fuelRes.json();
    
    const vehicle = vehicleData[0];
    const fuel = fuelData && fuelData.length > 0 ? fuelData[0] : null;

    return {
      merk: vehicle.merk,
      handelsbenaming: vehicle.handelsbenaming,
      brandstof: fuel ? fuel.brandstof_omschrijving : "Onbekend",
      bouwjaar: vehicle.datum_eerste_toelating ? vehicle.datum_eerste_toelating.substring(0, 4) : "Onbekend",
      kenteken: vehicle.kenteken
    };
  } catch (error) {
    console.error("RDW API Error:", error);
    return null;
  }
}
