use diesel::{prelude::*};
use uuid::{ Uuid};
use crate::{store::Store};


#[derive(Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::website)]
#[diesel(check_for_backend(diesel::pg::Pg))]

pub struct Website {
    pub id : String,
    pub url : String,
    pub user_id : String,
    pub time_added : chrono::NaiveDateTime
}


impl Store {
    pub fn create_website(&mut self, user_id : String , url : String) -> Result<Website, diesel::result::Error> {
        let id = Uuid::new_v4();
        let w = Website { 
            id : id.to_string(),
            url,
            user_id,
            time_added : chrono::Utc::now().naive_utc()
        };

        diesel::insert_into(crate::schema::website::table)
            .values(&w)
            .returning(Website::as_returning())
            .get_result(&mut self.connect)
            .expect("Error while creating website");

        Ok(w)
    } 
    pub fn get_website(&mut self , input_id : String) -> Result<Website, diesel::result::Error> {
        use crate::schema::website::dsl::*;
        let web = website.filter(id.eq(input_id))
            .select(Website::as_select())
            .first(&mut self.connect)?;
        Ok(web)
            
    }
}