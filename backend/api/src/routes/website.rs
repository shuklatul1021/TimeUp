use std::sync::{Arc, Mutex};

use poem::{handler, web::{ Data, Json, Path}};
use store::{store::Store};
use crate::{request_input::CreateWebsiteRequest, request_output::CreateWebsiteResponse, routes::auth_middleware::UserConfig};

#[handler]
pub fn get_website(
    Path(name) : Path<String>, 
    Data(s) : Data<&Arc<Mutex<Store>>>,
    UserConfig(user_config) : UserConfig
) -> String {
    let mut s = s.lock().unwrap();
    println!("User ID from token: {}", user_config);
    let web = s.get_website(name).unwrap();
    return format!("Hello, {}", web.id);
} 

#[handler]
pub fn create_website(
    Json(data) : Json<CreateWebsiteRequest>, 
    Data(s) : Data<&Arc<Mutex<Store>>>
) -> Json<CreateWebsiteResponse> {
    let mut _s = s.lock().unwrap();
    println!("Creating website with URL: {}", data.url);
    return Json(CreateWebsiteResponse { id: String::from("12345") });
}