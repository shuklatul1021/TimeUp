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
    Data(s) : Data<&Arc<Mutex<Store>>>,
    UserConfig(user_config) : UserConfig
) -> Json<CreateWebsiteResponse> {
    let mut s = s.lock().unwrap();
    let res = s.create_website(user_config, data.url);
    match res {
        Ok(web) => return Json(CreateWebsiteResponse { id : web.id }),
        Err(_e) => return Json(CreateWebsiteResponse { id: String::from("Error creating website") }),
    }
}