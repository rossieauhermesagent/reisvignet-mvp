export async function getVehicleData(licensePlate: string) {
  const cleanPlate = licensePlate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  
  try {
    // Gebruik de 'Gekentekende voertuigen' dataset (m9d7-ebf2)
    // Documentatie: https://dev.socrata.com/foundry/opendata.rdw.nl/m9d7-ebf2
    const response = await fetch(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${cleanPlate}`);
    const data = await response.json();
    
    if (!data || data.length === 0) {
      return null;
    }
    
    const vehicle = data[0];
    return {
      merk: vehicle.merk,
      handelsbenaming: vehicle.handelsbenaming,
      brandstof: vehicle.brandstof_omschrijving || "Onbekend",
      bouwjaar: vehicle.datum_eerste_toelating ? vehicle.datum_eerste_toelating.substring(0, 4) : "Onbekend",
      kenteken: vehicle.kenteken
    };
  } catch (error) {
    console.error("RDW API Error:", error);
    return null;
  }
}
