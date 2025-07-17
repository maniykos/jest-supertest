// API request and response types

// Types for registration
export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

// Types for authorization
export interface LoginRequest {
  email: string;
  password: string;
}

// General API response format
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: number;
  };
}

// Format of the response upon successful authorization
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}


// General API response format from Login
export interface ApiLoginResponse<T> {
  "token": string;
  "refreshToken": string;
  "expiresInMin": number;
  "success": boolean;
  "mfa": boolean;
  "email": string;
  "newDevice":  boolean;
  error?: {
    message: string;
    code?: number;
  };
}

// General API response format from Login
export interface ApiProfileResponse<T> {
  id: number;
  name: string;
  email: string;
  alternative_contact: string;
  phone: string;
  verify_phone: boolean;
  created_at: number;
  avatar: string | null;
  language: string;
  timezone: string;
  fiat_currency: string;
  mfa: boolean;
  login_attempts: number;
  subscriptions: {
    email_news: number;
    email_promotions: number;
    email_security: number;
    email_transactions: number;
    email_guides: number;
    push_news: number;
    push_promotions: number;
    push_security: number;
    push_transactions: number;
    push_guides: number;
    telegram_transactions: number;
  };
  referral_link: string;
  show_payment_pin: boolean;
  is_pin_enabled: boolean;
  mfa_code_on_login: boolean;
  email_code_on_login: boolean;
  mfa_code_on_withdrawal: boolean;
  email_code_on_withdrawal: boolean;
  hasLoggedIn: number;
  using: number;
  notify_last_viewed: number;
  disable_fingerprint: boolean;
  payment_pin_setter: string;
  telegram_username: string | null;
}


// Types for transactions
export interface OperationsApiResponseDto {
    operations: OperationDto[];
    _links: HateoasLinksDto;
    _meta: HateoasMetaDto;
}

export interface OperationDto {
  id: string;
  user_id: string;
  shop_id: string;
  type: string;
  status: string;
  pending_sum?: string;
  psys_cid: string;
  currency: string;
  source_currency: string;
  source_rate: string;
  fee: string;
  wallet_hash?: string;
  sendmany?: string[];
  params: OperationParamsDto;
  expire_at_utc: number;
  created_at_utc: number;
  amount: string;
  sum: string;
  commission: string;
  tx_url?: string;
  tx_id?: string[];
  confirmations?: number;
  status_code?: number;
}

export interface OperationParamsDto {
  fee?: FeeParamsDto;
  order_number?: string;
  order_name?: string;
  description?: string;
  source_amount?: string;
  source_currency?: string;
  value?: string;
  avatar?: string;
  store?: string;
  currency?: string;
  psys_cid?: string;
  amount?: string;
  source_rate?: string;
  email?: string;
}

export interface FeeParamsDto {
  conf_target?: string;
  plan?: string;
  value?: string;
}

export interface HateoasLinksDto {
  self: { href: string };
  next?: { href: string };
  last?: { href: string };
}

export interface HateoasMetaDto {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
}

export interface FeeSimplePlanItemDto {
  name: string;
  description: string;
  value: string;
}

export interface FeePlanCustomDto {
  min: number;
  max: number;
  default: number;
  borders: string;
  unit: string;
  field: string;
}

// Types for API operation types
export interface OperationTypesDto {
  statuses: string[];
  types: OperationTypeDto[];
  type_icons: OperationTypeDto[];
}

export interface OperationTypeDto {
  id: string;
  name: string;
}

// Interface for validation errors
export interface ValidationErrors {
  [key: string]: string[];
}

// Possible validation fields to check
export type ValidationField = 'fiat_currency' | 'alternative_contact' | 'name' | 'hasLoggedIn' | 'timezone' | 'amount' | string;

// Interface for user wallets
export interface ProfileWalletResponseDto {
  [psys_cid: string]: {
    id: string;
    user_id: number;
    psys_cid: string;
    hash: string | null;
    balance: string;
    commissionAmount: string;
    created_at: string | null;
    is_show: boolean;
    testnet: boolean;
    updated_at: string | null;
    fiat_currency: string;
    fiat_rate: string;
    balance_fiat: string;
    balance_fiat_raw: string;
  };
}
