import { ValidationErrors, ValidationField } from '../integration/types';

/**
 * Checks for validation errors in the API response
 * @param response API response with error
 * @param fields Array of fields to check
 * @returns Object with check results for each field
 */
export function checkValidationErrors(response: any, fields?: ValidationField[]): {
  isValidationError: boolean;
  errors: ValidationErrors;
  hasFields: Record<ValidationField, boolean>;
} {
  const result = {
    isValidationError: false,
    errors: {} as ValidationErrors,
    hasFields: {} as Record<ValidationField, boolean>
  };

  // Check if the response is a validation error
  if (response.status === 422 && 
      response.body && 
      response.body.name === 'Unprocessable entity') {

    result.isValidationError = true;

    try {
      // Try to parse the error message as JSON
      if (typeof response.body.message === 'string') {
        result.errors = JSON.parse(response.body.message) as ValidationErrors;
      } else if (typeof response.body.message === 'object') {
        // If message is already an object
        result.errors = response.body.message as ValidationErrors;
      }

      // Check for the specified fields in the errors
      if (fields && fields.length > 0) {
        fields.forEach(field => {
          result.hasFields[field] = !!result.errors[field];
        });
      }
    } catch (e) {
      console.error('Error parsing validation message:', e);
      console.log('Original message:', response.body.message);
    }
  }

  return result;
}

/**
 * Checks the API response for validation errors for the specified fields
 * @param response API response
 * @param expectedFields Expected fields with errors
 */
export function expectValidationErrorsFor(response: any, expectedFields: ValidationField[]): void {
  // Check response status
  expect(response.status).toBe(422);

  // Check the structure of the error response
  expect(response.body).toHaveProperty('status', 422);

  // Get and check validation errors
  const { isValidationError, errors, hasFields } = checkValidationErrors(response, expectedFields);

  // Check that this is a validation error
  expect(isValidationError).toBeTruthy();

  // Check for each expected field
  expectedFields.forEach(field => {
    if (!hasFields[field]) {
      console.error(`❌ Field '${field}' not found in validation errors`);
    }
  });

  // Check for each expected field
  expectedFields.forEach(field => {
    expect(hasFields[field]).toBeTruthy();
  });
}
