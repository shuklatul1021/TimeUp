use diesel::{prelude::*};
use uuid::Uuid;
use crate::{schema::user::username, store::Store};


#[derive(Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::user)]
#[diesel(check_for_backend(diesel::pg::Pg))]

struct User {
    id : String,
    username : String,
    password : String,
}


impl Store {
    pub fn register(&mut self , input_username : String , input_password : String ) -> Result<String , diesel::result::Error> {
        let id = Uuid::new_v4();
        let u = User {
            id : id.to_string(),
            username : input_username,
            password : input_password
        };
        
        diesel::insert_into(crate::schema::user::table)
            .values(&u)
            .returning(User::as_returning())
            .get_result(&mut self.connect)
            .expect("Error while creating user");

        Ok(id.to_string())
        
    } 
    pub fn login(&mut self , input_username : String , input_password : String) -> Result<bool , diesel::result::Error> {
        let users = crate::schema::user::table
            .filter(username.eq(input_username))
            .select(User::as_select())
            .load(&mut self.connect)
            .expect("Error loading User");

        if users.len() <= 0 {
            return Ok(false);
        }
        for u in users{
            if u.password != input_password {
                return Ok(false);
            }
        }

        Ok(true)
    }
}