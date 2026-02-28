use poem::{Route, Server, get, handler, listener::TcpListener, post, web::{ Json, Path}};
use store::store::Store;
use crate::{request_input::{CreateUserAuthRequest, CreateWebsiteRequest}, request_output::{CreateUserLogedInResponse, CreateUserRegestrationResponse, CreateWebsiteResponse}};

pub mod request_input;
pub mod request_output;


#[handler]
fn get_website(Path(name): Path<String>) -> String {
    let s = Store::default();
    return format!("Hello, {}!", name);

} 
#[handler]
fn create_website(Json(data) : Json<CreateWebsiteRequest>) -> Json<CreateWebsiteResponse> {
    let url = data.url;
    return Json(CreateWebsiteResponse { id: String::from("12345") });
}

#[handler]
fn register_user(Json(data) : Json<CreateUserAuthRequest>) -> Json<CreateUserRegestrationResponse> {
    let username = data.username;
    let password = data.password;
    return Json(CreateUserRegestrationResponse { message : String::from("Success") , success : true });
}

#[handler]
fn login_user(Json(data) : Json<CreateUserAuthRequest>) -> Json<CreateUserLogedInResponse> {
    let username = data.username;
    let password = data.password;
    return Json(CreateUserLogedInResponse { token : String::from("cjnxncxcxcxmccmxcnxcm")});
}


#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let app = Route::new()
        .at("/auth/register", post(register_user))
        .at("/auth/log-in", post(login_user))
        .at("/website/:website_id", get(get_website))
        .at("/website", post(create_website));

    Server::new(TcpListener::bind("0.0.0.0:3000"))
        .run(app)
        .await
}