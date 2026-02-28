use diesel::prelude::*;
use diesel::PgConnection;
use crate::config::Config;

pub struct Store{
    pub connect : PgConnection 
}
//Constructor for Store
impl Store{
    pub fn default() -> Result<Self , ConnectionError> {
        let config = Config::default();
        let connect = PgConnection::establish(&config.db_url)
            .unwrap_or_else(|_| panic!("Error connecting to {}", config.db_url));
        
        Ok(Self {
            connect
        })
    }
}