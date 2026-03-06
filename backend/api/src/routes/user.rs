use std::sync::{Arc, Mutex};
use jsonwebtoken::{encode, Header, EncodingKey };
use poem::{ handler, http::StatusCode, web::{ Data, Json}};
use poem::Error;
use store::store::Store;
use chrono::Utc;
use chrono::Duration;
use crate::{request_input::CreateUserAuthRequest, request_output::{Claims, CreateUserLogedInResponse, CreateUserRegestrationResponse}};

#[handler]
pub fn register_user(Json(data) : Json<CreateUserAuthRequest> ,  Data(s) : Data<&Arc<Mutex<Store>>>) -> Result<Json<CreateUserRegestrationResponse>, Error> {
    let mut s = s.lock().unwrap();
    let result = s.register(data.username, data.password);
    match result {
        Ok(id) => return Ok(Json(
            CreateUserRegestrationResponse{ 
                message : String::from("User registered successfully"),
                success : true, 
                id : Some(id)
            }),
        ),
        Err(e) => return Err(Error::from_string(format!("Error: {}", e), poem::http::StatusCode::INTERNAL_SERVER_ERROR)),
    }
    
}

#[handler]
pub fn login_user(Json(data) : Json<CreateUserAuthRequest>, Data(s) : Data<&Arc<Mutex<Store>>>) -> Result<Json<CreateUserLogedInResponse>, Error> {
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
                let secret = b"atulshukla_secret_key"; // In production, use a secure and private key
                let header = Header::default();
                let encoding_key = EncodingKey::from_secret(secret);

                let token = encode(&header, &claims, &encoding_key).map_err(|_| Error::from_status(StatusCode::UNAUTHORIZED))?;
                return Ok(Json( CreateUserLogedInResponse { token : token}));
            } else {
                return Err(Error::from_string(String::from("Invalid username or password"), poem::http::StatusCode::UNAUTHORIZED));
            }
        },
        Err(e) => return Err(Error::from_string(format!("Error: {}", e), poem::http::StatusCode::INTERNAL_SERVER_ERROR)),
    }
}