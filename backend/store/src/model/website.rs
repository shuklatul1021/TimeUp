use diesel::{prelude::*};
use uuid::Uuid;
use crate::{store::Store};


#[derive(Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::website)]
#[diesel(check_for_backend(diesel::pg::Pg))]

struct Website {
    id : String,
}


impl Store {
    pub fn create_website(&self) {

    } 
    pub fn get_website(&self) {

    }
}