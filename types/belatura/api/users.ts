import ApiResponseDto from './ApiResponse.dto';

export interface BelaturaUserCreateBodyDto {
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

export const emptyBelaturaUserCreate = {
  rs_ref: 0,
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

export interface BelaturaUserCreateResponseDataDto {
  rs_accessToken: string;
  rs_refreshToken: string;
  rs_ip: string;
  rs_agent: string;
  rs_userId: number;
}

export interface BelaturaUserCreateResponseDto extends ApiResponseDto {
  data: BelaturaUserCreateResponseDataDto;
}

export interface BelaturaPublicUserDto {
  rs_id: number;
  rs_initials_name: string;
  rs_ref: string;
}

export interface BelaturaUserGetResponseDto extends ApiResponseDto {
  data: BelaturaPublicUserDto[];
}

export interface BelaturaUserGetByIdResponseDto extends ApiResponseDto {
  data: BelaturaPublicUserDto;
}

export interface BelaturaUserForgetPasswordResponseDto extends ApiResponseDto {}

export interface BelaturaUserGetMyDataBodyDto {
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

export interface BelaturaUserGetMyDataDto extends ApiResponseDto {
  data: BelaturaUserGetMyDataBodyDto;
}

export interface BelaturaUserGetBodyDto {
  rs_id: number;
  rs_initials_name: string;
  rs_ref: number;
}

export interface BelaturaUserGetDto extends ApiResponseDto {
  data: BelaturaUserGetBodyDto[];
}
