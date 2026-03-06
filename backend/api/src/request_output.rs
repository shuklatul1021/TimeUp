use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct CreateWebsiteResponse {
    pub id: String,
}
#[derive(Serialize, Deserialize)]
pub struct CreateUserRegestrationResponse {
    pub message: String,
    pub success: bool,
    pub id : Option<String>
}
#[derive(Serialize, Deserialize)]
pub struct CreateUserLogedInResponse {
    pub token: String,
}
