import axios from 'axios';
import AppEnv from '@/utils/app-env';
import {
  BellaturaUserCreateBodyDto,
  BellaturaUserCreateResponseDto,
  BellaturaUserForgetPasswordResponseDto,
  BellaturaUserGetByIdResponseDto,
  BellaturaUserGetDto,
  BellaturaUserGetMyDataDto,
  BellaturaUserGetResponseDto,
} from '@/types/belatura/api/users';

export async function BellatureUserCreate(body: BellaturaUserCreateBodyDto) {
  const BACKNED_URL = AppEnv.BACKEND_URL;
  const URL = `${BACKNED_URL}/api/v1/users`;
  const response = await axios.post(URL, body);
  if (response.status === 200) {
    const json: BellaturaUserCreateResponseDto = response.data;
    return json;
  }

  throw new Error('' + response.status);
}

export async function BellaturaUserFindOneById(id: number) {
  const BACKNED_URL = AppEnv.BACKEND_URL;
  const URL = `${BACKNED_URL}/api/v1/users/${id}`;
  const response = await axios.get(URL);
  if (response.status === 200) {
    const json: BellaturaUserGetByIdResponseDto = response.data;
    return json;
  }

  throw new Error('' + response.status);
}

export async function BellaturaUserForgetPassword(loginOrEmail: string) {
  const BACKNED_URL = AppEnv.BACKEND_URL;
  const URL = `${BACKNED_URL}/api/v1/users/forget-password`;
  const response = await axios.post(URL, {
    rs_loginOrEmail: loginOrEmail,
  });
  if (response.status === 200) {
    const json: BellaturaUserForgetPasswordResponseDto = response.data;
    return json;
  }

  throw new Error('' + response.status);
}

export async function BellaturaUserGetMyData() {
  const BACKNED_URL = AppEnv.BACKEND_URL;
  const URL = `${BACKNED_URL}/api/v1/users/x/my-data`;
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
    },
  });
  if (response.status === 200) {
    const json: BellaturaUserGetMyDataDto = response.data;
    return json;
  }

  throw new Error('' + response.status);
}

export async function BellaturaUserGetGenerations(
  userId: number,
  generations: number,
) {
  const BACKNED_URL = AppEnv.BACKEND_URL;
  const URL = `${BACKNED_URL}/api/v1/users?generations=${generations}&id=${userId}`;
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
    },
  });
  if (response.status === 200) {
    const json: BellaturaUserGetResponseDto = response.data;
    return json;
  }

  throw new Error('' + response.status);
}
