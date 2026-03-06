use jsonwebtoken::{decode, DecodingKey, Validation};
use poem::{FromRequest, Request, RequestBody, Result};

use crate::request_output::Claims;

pub struct UserConfig(String);

impl<'a> FromRequest<'a> for UserConfig {
    async fn from_request(req: &'a Request, body: &mut RequestBody) -> Result<Self> {
        let secret = b"atulshukla_secret_key";
        let token = req
            .headers()
            .get("Authorization")
            .and_then(|h| h.to_str().ok())
            .ok_or_else(|| {
                poem::Error::from_string(
                    "Missing or invalid Authorization header",
                    poem::http::StatusCode::UNAUTHORIZED,
                )
            })?;

        let my_claims = decode::<Claims>(
            token,
            &DecodingKey::from_secret(secret),
            &Validation::default(),
        )
        .map_err(|e| {
            poem::Error::from_string(
                format!("Invalid token: {}", e),
                poem::http::StatusCode::UNAUTHORIZED,
            )
        })?;

        Ok(UserConfig(my_claims.claims.sub))
    }
}
