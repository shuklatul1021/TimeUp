use std::sync::{Arc, Mutex};

use poem::{handler, web::{ Data, Json}};
use store::store::Store;
use crate::{request_input::{CreateUserAuthRequest}, request_output::{CreateUserLogedInResponse, CreateUserRegestrationResponse}};

#[handler]
pub fn register_user(Json(data) : Json<CreateUserAuthRequest> ,  Data(s) : Data<&Arc<Mutex<Store>>>) -> Json<CreateUserRegestrationResponse> {
    let mut s = s.lock().unwrap();
    let result = s.register(data.username, data.password);
    match result {
        Ok(id) => return Json(CreateUserRegestrationResponse { message : String::from("User registered successfully") , success : true , id : Some(id)}),
        Err(e) => return Json(CreateUserRegestrationResponse { message : format!("Error: {}", e) , success : false ,  id : None }),
    }
    
}

#[handler]
pub fn login_user(Json(data) : Json<CreateUserAuthRequest>, Data(s) : Data<&Arc<Mutex<Store>>>) -> Json<CreateUserLogedInResponse> {
    let mut s = s.lock().unwrap();
    let result = s.login(data.username, data.password);
    match result {
        Ok(success) => {
            if success.0 {
                //Sign JWT Here and return it
                let user_id = success.1;
                return Json( CreateUserLogedInResponse { token : String::from("cjnxncxcxcxmccmxcnxcm")});
            } else {
                return Json( CreateUserLogedInResponse { token : String::from("Invalid username or password")});
            }
        },
        Err(e) => return Json( CreateUserLogedInResponse { token : format!("Error: {}", e)}),
    }
}