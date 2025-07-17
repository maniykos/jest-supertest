// Global types for the project

// Adding the testUser property to the global object

declare global {
  // Extending the global object (globalThis)
  var testUser: {
    email: string;
    password: string;
    token?: string;
    registeredEmail?: string; // Email used during registration
    registeredPassword?: string; // Password used during registration
  };
}

export {};