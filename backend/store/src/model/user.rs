use crate::{schema::user::email, store::Store};
use diesel::prelude::*;
use uuid::Uuid;

#[derive(Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::user)]
#[diesel(check_for_backend(diesel::pg::Pg))]

struct User {
    id: String,
    email : String,
    password: String,
}

impl Store {
    pub fn register(
        &mut self,
        input_email: String,
    ) -> Result<String, diesel::result::Error> {
        let id = Uuid::new_v4();
        let u = User {
            id: id.to_string(),
            email : email,
        };

        diesel::insert_into(crate::schema::user::table)
            .values(&u)
            .returning(User::as_returning())
            .get_result(&mut self.connect)
            .expect("Error while creating user Account");

        Ok(id.to_string())
    }
    pub fn login(
        &mut self,
        input_username: String,
        input_password: String,
    ) -> Result<(bool, String), diesel::result::Error> {
        use crate::schema::user::dsl::*;
        let users = user
            .filter(username.eq(input_username))
            .select(User::as_select())
            .load(&mut self.connect)
            .expect("Error loading User");

        if users.len() <= 0 {
            return Ok((false, String::from("User not found")));
        }
        let user_id = users[0].id.clone();
        for u in users {
            if u.password != input_password {
                return Ok((false, String::from("Invalid password")));
            }
        }

        Ok((true, user_id))
    }
}
