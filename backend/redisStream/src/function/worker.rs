use redis::{AsyncCommands, RedisError, streams::StreamReadOptions};

use crate::redis::RedisStream;

impl RedisStream {
    pub async fn x_read_group_website(&mut self) -> Result<String, RedisError> {
        let option = StreamReadOptions::default()
            .group("india", "india-worker-1")
            .count(10)
            .block(0);
        let _: () = self
            .client
            .xread_options(&["uptime:website"], &[">"], &option)
            .await?;

        Ok(String::from("Success"))
    }
}
