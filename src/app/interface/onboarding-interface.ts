export interface LoginResponse {
  nextStep: string;
  authToken: string;
  refreshToken: string;
  mfaToken: string;
  platform: string;
  qrUrl: string;
}
