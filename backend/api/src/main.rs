use poem::{Route, Server, get, handler, listener::TcpListener, post, web::{Json, Path}};
use store::store::Store;
use crate::{request_input::CreateWebsiteRequest, request_output::CreateWebsiteResponse};

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

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let app = Route::new()
        .at("/website/:website_id", get(get_website))
        .at("/website", post(create_website));

    Server::new(TcpListener::bind("0.0.0.0:3000"))
        .run(app)
        .await
}