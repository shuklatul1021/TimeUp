use redis::{AsyncCommands, RedisError};
use store::model::website::Website;
use crate::redis::RedisStream;


impl RedisStream {
    pub async fn x_add_bulk(
        &mut self,
        websites : &[Website]
    ) -> Result<String, RedisError> {
        for web in websites {
            let _: () = self.client
                        .xadd(
                            "uptime:website",
                            "*", 
                            &[
                                        ("id", &web.id), 
                                        ("url", &web.url), 
                                        ("user_id", &web.user_id), 
                                        ("time_added", &web.time_added.to_string())
                                    ]
                            ).await?;
        }
        Ok(String::from("Success"))
    }
    
}