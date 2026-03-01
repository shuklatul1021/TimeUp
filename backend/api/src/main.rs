use std::sync::{Arc, Mutex};

use poem::{EndpointExt, Route, Server, get, handler, listener::TcpListener, post, web::{ Data, Json, Path}};
use store::store::Store;
use crate::{request_input::{CreateUserAuthRequest, CreateWebsiteRequest}, request_output::{CreateUserLogedInResponse, CreateUserRegestrationResponse, CreateWebsiteResponse}};

pub mod request_input;
pub mod request_output;

#[handler]
fn get_website(Path(name): Path<String> , Data(s) : Data<&Arc<Mutex<Store>>>) -> String {
    let mut s = s.lock().unwrap();
    let web = s.get_website(name).unwrap();
    return format!("Hello, {}", web.id);
} 
#[handler]
fn create_website(Json(data) : Json<CreateWebsiteRequest>, Data(s) : Data<&Arc<Mutex<Store>>>) -> Json<CreateWebsiteResponse> {
    let mut _s = s.lock().unwrap();
    println!("Creating website with URL: {}", data.url);
    return Json(CreateWebsiteResponse { id: String::from("12345") });
}

#[handler]
fn register_user(Json(data) : Json<CreateUserAuthRequest> ,  Data(s) : Data<&Arc<Mutex<Store>>>) -> Json<CreateUserRegestrationResponse> {
    let mut _s = s.lock().unwrap();
    let username = data.username;
    let password = data.password;
    println!("Username: {}, Password: {}", username, password);
    return Json(CreateUserRegestrationResponse { message : String::from("Success") , success : true });
}

#[handler]
fn login_user(Json(data) : Json<CreateUserAuthRequest>, Data(s) : Data<&Arc<Mutex<Store>>>) -> Json<CreateUserLogedInResponse> {
    let mut _s = s.lock().unwrap();
    let username = data.username;
    let password = data.password;
    println!("Username: {}, Password: {}", username, password);
    return Json(CreateUserLogedInResponse { token : String::from("cjnxncxcxcxmccmxcnxcm")});
}


#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let s = Arc::new(Mutex::new(Store::default().unwrap()));
    let app = Route::new()
        .at("/auth/register", post(register_user))
        .at("/auth/log-in", post(login_user))
        .at("/website/:website_id", get(get_website))
        .at("/website", post(create_website))
        .data(s);

    Server::new(TcpListener::bind("0.0.0.0:3000"))
        .run(app)
        .await
}