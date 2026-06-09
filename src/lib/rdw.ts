export async function getVehicleData(licensePlate: string) {
  const cleanPlate = licensePlate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  
  try {
    // Gebruik de actuele Socrata API endpoint voor de hoofd-dataset (Personenauto's)
    // De resource ID 'm9gs-ivj3' is de oude ID, we gebruiken nu de stabiele 'm9gs-ivj3' proxy of de directe JSON export
    const response = await fetch(`https://opendata.rdw.nl/resource/ed9k-m3t2.json?kenteken=${cleanPlate}`);
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
