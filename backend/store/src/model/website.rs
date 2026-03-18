use crate::store::Store;
use diesel::deserialize::{self, FromSql, FromSqlRow};
use diesel::expression::AsExpression;
use diesel::pg::{Pg, PgValue};
use diesel::prelude::*;
use diesel::serialize::{self, IsNull, Output, ToSql};
use std::io::Write;
use uuid::Uuid;

#[derive(Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::website)]
#[diesel(check_for_backend(diesel::pg::Pg))]

pub struct Website {
    pub id: String,
    pub url: String,
    pub user_id: String,
    pub time_added: chrono::NaiveDateTime,
}

#[derive(Debug, Clone, PartialEq, AsExpression, FromSqlRow)]
#[diesel(sql_type = crate::schema::sql_types::WebsiteStatus)]
pub enum WebsiteStatus {
    Up,
    Down,
    Unknown,
}

impl ToSql<crate::schema::sql_types::WebsiteStatus, Pg> for WebsiteStatus {
    fn to_sql<'b>(&'b self, out: &mut Output<'b, '_, Pg>) -> serialize::Result {
        match self {
            WebsiteStatus::Up => out.write_all(b"Up")?,
            WebsiteStatus::Down => out.write_all(b"Down")?,
            WebsiteStatus::Unknown => out.write_all(b"Unknown")?,
        }
        Ok(IsNull::No)
    }
}

impl FromSql<crate::schema::sql_types::WebsiteStatus, Pg> for WebsiteStatus {
    fn from_sql(bytes: PgValue<'_>) -> deserialize::Result<Self> {
        match bytes.as_bytes() {
            b"Up" => Ok(WebsiteStatus::Up),
            b"Down" => Ok(WebsiteStatus::Down),
            b"Unknown" => Ok(WebsiteStatus::Unknown),
            _ => Err("Unrecognized enum variant for website_status".into()),
        }
    }
}

#[derive(Insertable, Queryable)]
#[diesel(table_name = crate::schema::website_tick)]
pub struct WebsiteTick {
    pub id: String,
    pub website_id: String,
    pub region_id: String,
    pub response_time_ms: i32,
    pub status: WebsiteStatus,
    #[diesel(column_name = createdAt)]
    pub created_at: chrono::NaiveDateTime,
}

impl Store {
    pub fn create_website(
        &mut self,
        user_id: String,
        url: String,
    ) -> Result<Website, diesel::result::Error> {
        let id = Uuid::new_v4();
        let w = Website {
            id: id.to_string(),
            url,
            user_id,
            time_added: chrono::Utc::now().naive_utc(),
        };

        diesel::insert_into(crate::schema::website::table)
            .values(&w)
            .returning(Website::as_returning())
            .get_result(&mut self.connect)
            .expect("Error while creating website");
        Ok(w)
    }

    pub fn get_website(&mut self, input_id: String) -> Result<Website, diesel::result::Error> {
        use crate::schema::website::dsl::*;
        let web = website
            .filter(id.eq(input_id))
            .select(Website::as_select())
            .first(&mut self.connect)?;
        Ok(web)
    }

    pub fn fetch_all_websites(&mut self) -> Result<Vec<Website>, diesel::result::Error> {
        use crate::schema::website::dsl::*;
        let web = website
            .select(Website::as_select())
            .load(&mut self.connect)?;
        Ok(web)
    }

    pub fn add_website_tick(
        &mut self,
        website_id: String,
        website_status: WebsiteStatus,
        response_time_ms: i32,
        region_id: String,
    ) -> Result<(), diesel::result::Error> {
        let tick = WebsiteTick {
            id: Uuid::new_v4().to_string(),
            website_id,
            region_id,
            response_time_ms,
            status: website_status,
            created_at: chrono::Utc::now().naive_utc(),
        };
        diesel::insert_into(crate::schema::website_tick::table)
            .values(&tick)
            .execute(&mut self.connect)?;
        Ok(())
    }
}
