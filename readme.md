### **1\. Register a User**

**Endpoint:** /users/register**Method:** POST**Description:** Registers a new user. This endpoint allows users to create an account by providing their full name, email, and password.

#### Request Body:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   {    "fullName": "John Doe",    "email": "john.doe@example.com",    "password": "password123"  }   `

**Validations:**

*   fullName: Minimum length of 3 characters.
    
*   email: Must be a valid email address.
    
*   password: Minimum length of 8 characters.
    

#### Response (Success):

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   {    "status": 201,    "data": {      "_id": "userId",      "fullName": "John Doe",      "email": "john.doe@example.com",      "profilePic": null,      "socketId": null,      "createdAt": "2024-12-11T12:34:56Z",      "updatedAt": "2024-12-11T12:34:56Z"    },    "message": "User created successfully"  }   `

#### Response (Error):

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   {    "status": 400,    "message": "User already exists"  }   `

### **2\. Login a User**

**Endpoint:** /users/login**Method:** POST**Description:** Logs in an existing user. Upon successful login, a JWT token is generated and sent in a cookie.

#### Request Body:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   {    "email": "john.doe@example.com",    "password": "password123"  }   `

#### Response (Success):

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   {    "status": 200,    "data": {      "_id": "userId",      "fullName": "John Doe",      "email": "john.doe@example.com"    },    "message": "User logged in successfully"  }   `

#### Response (Error):

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   {    "status": 400,    "message": "Invalid credentials"  }   `

### **3\. Logout a User**

**Endpoint:** /users/logout**Method:** GET**Description:** Logs out a user by clearing the JWT token stored in the cookies.

#### Response (Success):

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   {    "status": 200,    "data": {},    "message": "User logged out successfully"  }   `

### **Error Handling**

The API uses a custom error handler (ApiError) for consistency. Errors are returned with the following format:

#### Example Error Response:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   {    "status": 400,    "message": "All fields are required"  }   `

The API provides two main types of errors:

*   400 Bad Request: Invalid input or missing required fields.
    
*   500 Internal Server Error: Something went wrong on the server.
    

### **Security**

*   **JWT Authentication**: Tokens are used for secure authentication. They are stored in an httpOnly cookie and are required for secure routes.
    
*   **Password Hashing**: Passwords are hashed using bcrypt before being stored in the database to ensure security.