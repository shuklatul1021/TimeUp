use redis::{
    AsyncCommands, RedisError,
    streams::{StreamReadOptions, StreamReadReply},
};

use crate::redis::RedisStream;

impl RedisStream {
    pub async fn create_consumer_group(&mut self) -> Result<(), RedisError> {
        // Create group + stream if they don't exist. Ignore error if group already exists.
        let result: Result<(), RedisError> = redis::cmd("XGROUP")
            .arg("CREATE")
            .arg("uptime:website")
            .arg("india")
            .arg("0")
            .arg("MKSTREAM")
            .query_async(&mut self.client)
            .await;
        match result {
            Ok(()) => Ok(()),
            Err(e) if e.to_string().contains("BUSYGROUP") => Ok(()), // already exists
            Err(e) => Err(e),
        }
    }

    pub async fn x_read_group_website(&mut self) -> Result<StreamReadReply, RedisError> {
        let option: StreamReadOptions = StreamReadOptions::default()
            .group("india", "india-worker-1")
            .count(10)
            .block(5000);
        let reply: StreamReadReply = self
            .client
            .xread_options(&["uptime:website"], &[">"], &option)
            .await?;
        Ok(reply)
    }
}
