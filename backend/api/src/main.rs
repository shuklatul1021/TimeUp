use std::sync::{Arc, Mutex};

use poem::{EndpointExt, Route, Server, get, listener::TcpListener, post};
use store::store::Store;
use crate::routes::user::{register_user, login_user};
use crate::routes::website::{get_website, create_website};

pub mod request_input;
pub mod request_output;
pub mod routes;

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