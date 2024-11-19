export enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}

export enum UserRoles {
  Client,
  Artist,
  Admin
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

export enum MediaType {
  Video,
  Image,
  HLS
}

export enum EncodingStatus {
  Pending,
  Processing,
  Success,
  Failed
}

export enum TattooSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}
export enum ShipMethod {
  InnerCity,
  OuterCity
}

export enum PaymentMethod {
  Cash,
  CreditCard,
  PayPal,
  Bank
}
export enum OrderStatus {
  Pending,
  Processing,
  Shipped,
  Completed,
  Cancelled
}

export enum AppointmentStatus {
  Confirmed = 'confirmed',
  Inprogress = 'inprogress',
  Ongoing = 'ongoing',
  Rescheduled = 'rescheduled',
  Cancelled = 'cancelled',
  Completed = 'completed'
}
export enum SessionStatus {
  Inprogress = 'inprogress',
  Ongoing = 'ongoing',
  Rescheduled = 'rescheduled',
  Cancelled = 'cancelled',
  Completed = 'completed'
}

export enum AppointmentStatusRequest {
  Pending,
  IsScheduled,
  Cancelled
}

export enum AppointmentType {
  Consultation = 'consultation',
  Tattooing = 'tattooing'
}

export enum AppointmentTattooStatus {
  Confirmed,
  InProgress,
  Rescheduled,
  Cancelled,
  Completed
}

export enum DesInc {
  Des,
  Inc
}
