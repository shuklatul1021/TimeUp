use poem::{Route, Server, get, handler, listener::TcpListener, post, web::{Data, Json, Path}};
use store::store::Store;
use crate::{request_input::{CreateUserAuthRequest, CreateWebsiteRequest}, request_output::CreateWebsiteResponse};

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
fn register_user(Json(data) : Json<CreateUserAuthRequest>) -> Json<CreateWebsiteResponse> {
    let username = data.username;
    let password = data.password;
    return Json(CreateWebsiteResponse { id: String::from("12345") });
}
#[handler]
fn login_user(Json(data) : Json<CreateUserAuthRequest>) -> Json<CreateWebsiteResponse> {
    let username = data.username;
    let password = data.password;
    return Json(CreateWebsiteResponse { id: String::from("12345") });
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