import axios from 'axios';
import AppEnv from '@/utils/app-env';
import {
  BelaturaUserCreateBodyDto,
  BelaturaUserCreateResponseDto,
  BelaturaUserForgetPasswordResponseDto,
  BelaturaUserGetByIdResponseDto,
  BelaturaUserGetDto,
  BelaturaUserGetMyDataDto,
} from '@/types/belatura/api/users';

export async function BelatureUserCreate(body: BelaturaUserCreateBodyDto) {
  const BACKNED_URL = AppEnv.BACKEND_URL;
  const URL = `${BACKNED_URL}/api/v1/users`;
  const response = await axios.post(URL, body);
  if (response.status === 200) {
    const json: BelaturaUserCreateResponseDto = response.data;
    return json;
  }

  throw new Error('' + response.status);
}

export async function BelaturaUserFindOneById(id: number) {
  const BACKNED_URL = AppEnv.BACKEND_URL;
  const URL = `${BACKNED_URL}/api/v1/users/${id}`;
  const response = await axios.get(URL);
  if (response.status === 200) {
    const json: BelaturaUserGetByIdResponseDto = response.data;
    return json;
  }

  throw new Error('' + response.status);
}

export async function BelaturaUserForgetPassword(loginOrEmail: string) {
  const BACKNED_URL = AppEnv.BACKEND_URL;
  const URL = `${BACKNED_URL}/api/v1/users/forget-password`;
  const response = await axios.post(URL, {
    rs_loginOrEmail: loginOrEmail,
  });
  if (response.status === 200) {
    const json: BelaturaUserForgetPasswordResponseDto = response.data;
    return json;
  }

  throw new Error('' + response.status);
}

export async function BelaturaUserGetMyData() {
  const BACKNED_URL = AppEnv.BACKEND_URL;
  const URL = `${BACKNED_URL}/api/v1/users/x/my-data`;
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
    },
  });
  if (response.status === 200) {
    const json: BelaturaUserGetMyDataDto = response.data;
    return json;
  }

  throw new Error('' + response.status);
}

export async function BelaturaUserGetGenerations(
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
    const json: BelaturaUserGetDto = response.data;
    return json;
  }

  throw new Error('' + response.status);
}
