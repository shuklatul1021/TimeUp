use redis::{AsyncCommands, ErrorKind, RedisError};
use crate::redis::RedisStream;


impl RedisStream {
    pub async fn x_add_bulk(&mut self) -> Result<String, RedisError> {
        let websites = self.db.fetch_all_websites();
        match websites {
            Ok(websites) => {
                for web in websites {
                    let _: () = self.client.xadd("timeup", "*", &[("id", web.id), ("url", web.url), ("user_id", web.user_id), ("time_added", web.time_added.to_string())]).await?;
                }
            },
            Err(e) => {
                eprintln!("Error fetching websites: {}", e);
                return Err(RedisError::from((ErrorKind::IoError, "Failed to fetch websites from database")));
            }
        }
        Ok(String::from("Success"))
    }
    
}