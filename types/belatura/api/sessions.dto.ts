import ApiResponseDto from './ApiResponse.dto';

export interface BellaturaSessionCreateBodyDto {
  rs_loginOrEmail: string;
  rs_password: string;
}

export const emptyBellaturaSessionCreateBody: BellaturaSessionCreateBodyDto = {
  rs_loginOrEmail: '',
  rs_password: '',
};

export interface BellaturaSessionCreateReponseDataDto {
  rs_accessToken: string;
  rs_refreshToken: string;
  rs_ip: string;
  rs_agent: string;
  rs_userId: number;
}

export interface BellaturaSessionCreateResponseDto extends ApiResponseDto {
  data: BellaturaSessionCreateReponseDataDto;
}
