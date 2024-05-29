import axios from 'axios';

export interface ItemDto {
  rs_seoTitle: string;
  rs_seoDescription: string;
  rs_seoUrlSegment: string;
  rs_vendors: string;
  rs_warranty: string;
  rs_createDate: string;
  rs_conclusion: string;
  rs_creatorAddress: string;
  rs_importAddress: string;
  rs_serviceAddress: string;
  rs_count: number;
  rs_cost: number;
  rs_barcodes: string;
  rs_codeTNVED: string;
  rs_brand: string;
  rs_country: string;
  rs_photos: string;
  rs_markdown: string;
}

export const emptyItemDto: ItemDto = {
  rs_seoTitle: '',
  rs_seoDescription: '',
  rs_seoUrlSegment: '',
  rs_vendors: '',
  rs_warranty: '',
  rs_createDate: '',
  rs_conclusion: '',
  rs_creatorAddress: '',
  rs_importAddress: '',
  rs_serviceAddress: '',
  rs_count: 0,
  rs_cost: 0,
  rs_barcodes: '',
  rs_codeTNVED: '',
  rs_brand: '',
  rs_country: '',
  rs_photos: '',
  rs_markdown: '',
};

export async function FetchItems() {
  const URL = `https://bellatura.github.io/bellatura_data/data.json?v${new Date().toJSON()}`;
  const response = await axios.get(URL);
  if (response.status === 200) {
    const json: ItemDto[] = response.data;
    return json;
  }

  throw new Error(`HTTP status ${response.status}`);
}

export async function FetchItemBySeoUrlSegment(seoUrlSegment: string) {
  const URL = `https://bellatura.github.io/bellatura_data/data.json?v${new Date().toJSON()}`;
  const response = await axios.get(URL);
  if (response.status === 200) {
    const json: ItemDto[] = response.data;

    for (let i = 0; i < json.length; ++i) {
      if (json[i].rs_seoUrlSegment === seoUrlSegment) {
        return json[i];
      }
    }

    throw new Error(`HTTP status 404`);
  }

  throw new Error(`HTTP status ${response.status}`);
}
