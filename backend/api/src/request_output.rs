use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct CreateWebsiteResponse {
    pub id: String,
}
#[derive(Serialize, Deserialize)]
pub struct UserRegistrationResponse {
    pub message: String,
    pub success: bool,
}
#[derive(Serialize, Deserialize)]
pub struct CreateUserLogedInResponse {
    pub token: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, // Subject (user ID, etc.)
    pub exp: usize,  // Expiration time
    pub iat: usize,  // Issued at time
}
