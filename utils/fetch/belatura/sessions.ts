import axios from 'axios';
import AppEnv from '@/utils/app-env';
import {
  BellaturaSessionCreateBodyDto,
  BellaturaSessionCreateResponseDto,
} from '@/types/belatura/api/sessions.dto';

export async function BellaturaSessionCreate(
  body: BellaturaSessionCreateBodyDto,
) {
  const BACKNED_URL = AppEnv.BACKEND_URL;
  const URL = `${BACKNED_URL}/api/v1/sessions`;
  const response = await axios.post(URL, body);
  if (response.status === 201) {
    const json: BellaturaSessionCreateResponseDto = response.data;
    return json;
  }

  throw new Error('' + response.status);
}
