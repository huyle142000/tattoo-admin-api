export const COMMON_MESSAGE = {
  GET_SUCCESSFULLY: 'GET SUCCESSFULLY!',
  POST_SUCCESSFULLY: 'POST SUCCESSFULLY!',
  UPDATE_SUCCESSFULLY: 'UPDATE SUCCESSFULLY!',

  DELETE_SUCCESSFULLY: 'DELETE SUCCESSFULLY!',
  NAME_IS_REQUIRED: 'Name is required',
  EMAIL_IS_REQUIRED: 'Email is required',
  PHONENUMBER_IS_REQUIRED: 'Phone number is required',

  NAME_DUPLICATE: 'This name is already in use in both Vietnamese and English.',
  INEXISTENT_TATTOO: 'Tattoo  is inexistent',
  INEXISTENT_CLIENT: 'Client  is inexistent',
  INEXISTENT_ARTIST: 'Artist  is inexistent',
  INEXISTENT_CATEGORY: 'Artist  is inexistent',
  INEXISTENT_BODYPART: 'Body part is inexistent'
}

export const USER_MESSAGE = {
  VALIDATION_ERROR: 'Validation error.',

  NAME_IS_REQUIRED: 'Name is required.',
  NAME_MUST_BE_A_STRING: 'Name must be a string.',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100 characters.',

  USER_NOT_FOUND: 'User not found.',
  USER_NOT_VERIFIED: 'User not verified.',
  USER_IS_FOLLOWING: 'User is following.',
  USER_IS_NOT_ALLOWED: 'User is not allowed.',

  UNFOLLOW_SUCESS: 'Unfollow succesfully.',

  USER_IS_NOT_FOLLOWING: 'User is not following.',
  FOLLOW_USER_IS_INVALID: 'Follow user id is invalid.',
  EMAIL_IS_REQUIRED: 'Email is required.',
  EMAIL_ALREADY_EXISTS: 'Email address already exists.',
  EMAIL_IS_INVALID: 'Email address must be valid.',

  PASSWORD_IS_REQUIRED: 'Password is required.',
  OLD_PASSWORD_IS_WRONG: 'Old password must be correct.',

  PASSWORD_MUST_BE_STRING: 'Password must be a string.',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Name length must be from 6 to 50 characters.',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number and one symbol.',

  CONFIRM_PASSWORD_MUST_BE_STRING: 'Confirm password must be string.',
  CONFIRM_PASSWORD_MUST_BE_STRONG: 'Confirm password must be at least 1 uppercase letter, 1 number, 1 symbol.',

  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required.',

  REFRESH_TOKEN_SUCCESS: 'Get refresh token successfully.',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required.',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid.',
  REFRESH_TOKEN_IS_NOT_EXISTED: 'Refresh token is not existed or is used by another.',

  EMAIL_ALREADY_VERIFIED: 'Email already verified.',
  EMAIL_VERIFIED_SUCCESS: 'Email verified successfully.',
  RESEND_EMAIL_VERIFIED_SUCCESS: 'Resend email verified successfully.',

  RESEND_FORGOT_PASSWORD_SUCCESS: 'Resend forgotpasswoed verified successfully.',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required.',
  VERIFY_FORGOT_PASSWORD_SUCCESSFULLY: 'Forgot password is successfully verified.',
  FORGOT_PASSWORD_TOKEN_IS_INVALID: 'Forgot password token is invalid.',

  RESSET_PASSWORD_SUCCESSFULLY: 'Your password was successfully changed.',
  LOGOUT_SUCCESSFULLY: 'Logout successfully.',
  LOGIN_SUCCESSFULLY: 'Login successfully.',

  GET_PROFILE_SUCCESS: 'Get profile success.',
  UPDATE_PROFILE_SUCCESS: 'Update profile successfully.',

  USERNAME_MUST_BE_STRING: 'Username must be a string.',
  BIO_MUST_BE_STRING: 'Bio must be a string.',
  LOCATION_MUST_BE_STRING: 'Location must be a string.',
  WEBSITE_MUST_BE_STRING: 'Website must be a string.',
  AVATAR_MUST_BE_STRING: 'Avatar must be a string.',
  COVER_PHOTO_MUST_BE_STRING: 'Cover photo must be a string'
} as const

// TATOO
export const TATTOOS_MESSAGE = {
  NAME_REQUIRED: 'Tattoo name is required.',
  NAME_DUPLICATE: 'This name is already in use in both Vietnamese and English.',
  PRICE_NUMERIC: 'Price must be a number.',
  PRICE_POSITIVE: 'Price must be a positive number.',
  IMAGES_ARRAY: 'Images must be an array of strings (URLs).',
  IMAGE_URL_STRING: 'Each image URL must be a string.',
  COMPLETION_TIME_NUMERIC: 'Completion time must be a number.',
  COMPLETION_TIME_POSITIVE: 'Completion time must be a positive number.',
  DESCRIPTION_STRING: 'Description must be a string.',
  STYLE_STRING: 'Style must be a string.',
  SIZE_IN_OPTIONS: 'Size must be one of "small", "medium", or "large".',
  BODYPART_STRING: 'Body part must be a string.',
  ARTIST_STRING: 'Artist name must be a string.',
  ARTIST_IS_INEXISTENT: 'Artist is inexistent.',

  ISACTIVE_BOOLEAN: 'isActive must be true or false.',
  CATEGORYID_STRING: 'Category ID must be a string.', // Adjust based on categoryId type
  IS_INEXISTENT: 'Tattoo is inexistent'
}
//  TATOO-CTGS

export const TATTOO_CATEGORY_MESSAGES = {
  NAME_REQUIRED: 'Category name is required..',
  NAME_DUPLICATE: 'This name is already in use in both Vietnamese and English..',
  DESCRIPTION_REQUIRED: 'Category description is required..',
  INVALID_ID: 'Invalid category ID format..',
  POST_SUCCESSFULLY: 'Tattoo categories POST successfully.',
  GET_SUCCESSFULLY: 'Tattoo categories GET successfully.',
  IS_NOT_EXISTED: 'Tattoo categories is not existed.'
}

// TATTOO_APPOINTMENT_MESSAGE
export const TATTOO_APPOINTMENT_MESSAGE = {
  INVALID_TATTOO_STATUS: "Can't delete this appointment because it's inprogress.",

  TATTOOID_REQUIRED: 'Tattoo ID is required.',
  TATTOOID_INVALID: 'Invalid tattoo ID (should be an ObjectId).',

  APPOINTMENT_REQUIRED: 'Appointment is required.',
  APPOINTMENT_IS_INEXISTENT: 'Appointment is inexistent.',

  SERVICE_IS_REQUIRED: 'Service is required.',
  SERVICE_IS_INEXISTENT: 'Service is inexistent.',

  CLIENT_IS_INEXISTENT: 'Client is inexistent.',
  CLIENT_IS_REQUIRED: 'Client is required.',

  EXECUTOR_IS_INEXISTENT: 'Executor is inexistent.',
  EXECUTOR_IS_REQUIRED: 'Executor is required.',
  EXECUTOR_REQUIRED: 'Artist ID is required.',
  EXECUTOR_INVALID: 'Invalid artist ID (should be an ObjectId).',

  ARTIST_IS_INEXISTENT: 'Artist is inexistent.',
  ARTISTID_REQUIRED: 'Artist ID is required.',
  ARTISTID_INVALID: 'Invalid artist ID (should be an ObjectId).',

  STARTTIME_REQUIRED: 'Start time is required.',
  STARTTIME_INVALID: 'Invalid start time format (should be a valid date and time).',

  ENDTIME_REQUIRED: 'End time is required.',
  ENDTIME_INVALID: 'Invalid end time format (should be a valid date and time).',

  TIME_IS_IN_PAST: 'Time is in past.',
  STARTIME_IS_EARLIER_THAN_ENDTIME: 'The start time must be earlier than the end time.',

  STATUS_INVALID: 'Invalid status (should be one of the allowed statuses).',
  START_END_TIME_DUPLICATED: 'Start and end time is duplicated.',

  // Other
  INVALID_ID_FORMAT: 'Invalid ID format (should be a string or ObjectId).',
  INVALID_DATE_FORMAT: 'Invalid date format (should be a valid date).',
  DESCRIPTION_STRING: 'Description must be a string.'
}

// SESSION_MESSAGE
export const SESSION_MESSAGE = {
  PREVIOUS_SESSION_HAS_NOT_COMPLETED_YET_OR_BEEN_CANCELED: "Previous session hasn't completed yet or been canceled."
}
