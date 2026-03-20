use crate::{
    request_input::{CreateUserAuthRequest, UserAuthStructureRequest},
    request_output::{Claims, CreateUserLogedInResponse, CreateUserRegestrationResponse},
};
use chrono::Duration;
use chrono::Utc;
use jsonwebtoken::{encode, EncodingKey, Header};
use poem::Error;
use poem::{
    handler,
    http::StatusCode,
    web::{Data, Json},
};
use reqwest;
use serde_json::json;
use std::sync::{Arc, Mutex};
use store::store::Store;

#[handler]
pub fn authenticate_user(
    Json(data): Json<UserAuthStructureRequest>,
    Data(s): Data<&Arc<Mutex<Store>>>,
) -> Result<Json<UserRegistrationResponse>, Error> {
    let mut s = s.lock().unwrap();
    let result = s.register(data.email);
    match result {
        Ok(id) => {
            /**
             * Create Jwt Token
             */
            let now = Utc::now().naive_utc();
            let expiration = (now + Duration::hours(24)).and_utc().timestamp() as usize; // Token expires in 24 hour
            let issued_at = now.and_utc().timestamp() as usize;

            let claims = Claims {
                sub: id,
                exp: expiration,
                iat: issued_at,
            };
            let secret = b"atulshukla_secret_key";
            let header = Header::default();
            let encoding_key = EncodingKey::from_secret(secret);

            let token = encode(&header, &claims, &encoding_key)
                .map_err(|_| Error::from_status(StatusCode::UNAUTHORIZED))?;
            /**
             * Sending The Magic Link To The User Through Mail
             */
            let send_email_endpoint = String::from("https://send.api.mailtrap.io/api/send");
            let api_key = String::from("09ca6ec9c16c29cfbd93684c4ad1fb9b");
            let html_content = r#"
                <html>
                    <body>
                        <h1>Hello!</h1>
                        <p>This is a <strong>test email</strong> from Rust!</p>
                    </body>
                </html>
            "#;
            let email_payload = json!({
                "from": {"email" : "your_verified_domain"},
                "to": [{"email": format!("{}", data.email)}],
                "subject": "Test Email",
                "text": format!("{}",html_content),
            });
            let client = reqwest::Client::new();
            let response = client
                .post(api_url)
                .header("Content-Type", "application/json")
                .header("Api-Token", api_key)
                .body(email_payload.to_string()) // Serialize the JSON payload to a string
                .send();

            return Ok(Json(UserRegistrationResponse{
                message : "Email Send Successfully",
                success : token
            }));
        }
        Err(e) => {
            return Err(Error::from_string(
                format!("Error: {}", e),
                poem::http::StatusCode::INTERNAL_SERVER_ERROR,
            ))
        }
    }
}

#[handler]
pub fn verify_user_auth_token(
    Json(data): Json<UserVerifyStructureRequest>,
    Data(s): Data<&Arc<Mutex<Store>>>,
) -> Result<Json<CreateUserLogedInResponse>, Error> {
    let mut s = s.lock().unwrap();
    let result = s.login(data.username, data.password);
    let now = Utc::now().naive_utc();
    let expiration = (now + Duration::hours(24)).and_utc().timestamp() as usize; // Token expires in 24 hour
    let issued_at = now.and_utc().timestamp() as usize;
    match result {
        Ok(success) => {
            if success.0 {
                //Sign JWT Here and return it
                let user_id = success.1;
                let claims = Claims {
                    sub: user_id,
                    exp: expiration,
                    iat: issued_at,
                };
                let secret = b"atulshukla_secret_key";
                let header = Header::default();
                let encoding_key = EncodingKey::from_secret(secret);

                let token = encode(&header, &claims, &encoding_key)
                    .map_err(|_| Error::from_status(StatusCode::UNAUTHORIZED))?;
                return Ok(Json(CreateUserLogedInResponse { token: token }));
            } else {
                return Err(Error::from_string(
                    String::from("Invalid username or password"),
                    poem::http::StatusCode::UNAUTHORIZED,
                ));
            }
        }
        Err(e) => {
            return Err(Error::from_string(
                format!("Error: {}", e),
                poem::http::StatusCode::INTERNAL_SERVER_ERROR,
            ))
        }
    }
}
