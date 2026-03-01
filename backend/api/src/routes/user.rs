use std::sync::{Arc, Mutex};

use poem::{handler,web::{ Data, Json}};
use store::store::Store;
use crate::{request_input::{CreateUserAuthRequest}, request_output::{CreateUserLogedInResponse, CreateUserRegestrationResponse}};

#[handler]
pub fn register_user(Json(data) : Json<CreateUserAuthRequest> ,  Data(s) : Data<&Arc<Mutex<Store>>>) -> Json<CreateUserRegestrationResponse> {
    let mut _s = s.lock().unwrap();
    let username = data.username;
    let password = data.password;
    println!("Username: {}, Password: {}", username, password);
    return Json(CreateUserRegestrationResponse { message : String::from("Success") , success : true });
}

#[handler]
pub fn login_user(Json(data) : Json<CreateUserAuthRequest>, Data(s) : Data<&Arc<Mutex<Store>>>) -> Json<CreateUserLogedInResponse> {
    let mut _s = s.lock().unwrap();
    let username = data.username;
    let password = data.password;
    println!("Username: {}, Password: {}", username, password);
    return Json(CreateUserLogedInResponse { token : String::from("cjnxncxcxcxmccmxcnxcm")});
}