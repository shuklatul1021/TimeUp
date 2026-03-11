use serde::{Serialize , Deserialize};


#[derive(Serialize, Deserialize)]
pub struct Request {
    pub isUp : bool 
}