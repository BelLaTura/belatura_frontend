import axios from 'axios';
import { NominatimOpenstreetmapOrgAddressDto } from '@/types/nominatim.openstreetmap.org/get-address.dto';

export async function NominatimOpenstreetmapOrgGetAddress(q: string) {
  try {
    const URL = `https://nominatim.openstreetmap.org/search.php?format=json&q=${q}`;
    const response = await axios.get(URL);
    if (response.status === 200) {
      const json: NominatimOpenstreetmapOrgAddressDto[] = response.data;
      return json.map((e) => e.display_name);
    }
    return [];
  } catch (exception) {
    return [];
  }
}
