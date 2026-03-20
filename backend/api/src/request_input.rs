use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct CreateWebsiteRequest {
    pub url: String,
}

#[derive(Serialize, Deserialize)]
pub struct UserAuthStructureRequest{
    pub email : String
}

#[derive(Serialize, Deserialize)]
pub struct UserVerifyStructureRequest{
    pub token : String
}
