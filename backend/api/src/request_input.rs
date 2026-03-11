use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct CreateWebsiteRequest {
    pub url: String,
}

#[derive(Serialize, Deserialize)]
pub struct CreateUserAuthRequest {
    pub username: String,
    pub password: String,
}
