import ApiResponseDto from './ApiResponse.dto';

// POST /api/v1/users

export interface BellaturaUserCreateBodyDto {
  rs_ref: number;
  rs_email: string;
  rs_login: string;
  rs_surname: string;
  rs_name: string;
  rs_middlename: string;
  rs_password: string;
  rs_birthday: string;
  rs_phone: string;
  rs_address: string;
  rs_telegramNickname: string;
}

export const emptyBelaturaUserCreate: BellaturaUserCreateBodyDto = {
  rs_ref: -1,
  rs_email: '',
  rs_login: '',
  rs_surname: '',
  rs_name: '',
  rs_middlename: '',
  rs_password: '',
  rs_birthday: '',
  rs_phone: '',
  rs_address: '',
  rs_telegramNickname: '',
};

export interface BellaturaUserCreateResponseDataDto {
  rs_accessToken: string;
  rs_refreshToken: string;
  rs_ip: string;
  rs_agent: string;
  rs_userId: number;
}

export interface BellaturaUserCreateResponseDto extends ApiResponseDto {
  data: BellaturaUserCreateResponseDataDto;
}

// GET /api/v1/users

export interface BellaturaUserGetDto {
  rs_middlename: string;
  rs_name: string;
  rs_surname: string;
  rs_id: number;
  rs_ref: number;
  rs_address: string;
  rs_birthday: string;
  rs_email: string;
  rs_phone: string;
  rs_telegramNickname: string;
}

export const emptyBellaturaUserGetDto: BellaturaUserGetDto = {
  rs_middlename: '',
  rs_name: '',
  rs_surname: '',
  rs_id: 0,
  rs_ref: 0,
  rs_address: '',
  rs_birthday: '',
  rs_email: '',
  rs_phone: '',
  rs_telegramNickname: '',
};

export interface BellaturaUserGetResponseDto extends ApiResponseDto {
  data: BellaturaUserGetDto[];
}

// GET /api/v1/users/{id}

export interface BellaturaUserGetByIdResponseDto extends ApiResponseDto {
  data: BellaturaUserGetDto;
}

// GET /api/v1/users/x/forget-password

export interface BellaturaUserForgetPasswordResponseDto
  extends ApiResponseDto {}

// GET /api/v1/users/x/my-data

export interface BellaturaUserGetMyDataBodyDto {
  rs_id: number;
  rs_ref: number;
  rs_email: string;
  rs_login: string;
  rs_surname: string;
  rs_name: string;
  rs_middlename: string;
  rs_birthday: string;
  rs_phone: string;
  rs_address: string;
  rs_telegramNickname: string;
}

export const emptyBellaturaUserGetMyDataBodyDto: BellaturaUserGetMyDataBodyDto =
  {
    rs_address: '',
    rs_birthday: '',
    rs_email: '',
    rs_id: 0,
    rs_login: '',
    rs_middlename: '',
    rs_name: '',
    rs_phone: '',
    rs_ref: 0,
    rs_surname: '',
    rs_telegramNickname: '',
  };

export interface BellaturaUserGetMyDataDto extends ApiResponseDto {
  data: BellaturaUserGetMyDataBodyDto;
}
