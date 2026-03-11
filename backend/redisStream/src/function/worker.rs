use redis::{AsyncCommands, RedisError, streams::{StreamReadOptions, StreamReadReply}};

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

    pub async fn x_read_group_website(&mut self) -> Result<String, RedisError> {
        let option: StreamReadOptions = StreamReadOptions::default()
            .group("india", "india-worker-1")
            .count(10)
            .block(0);
        let reply : StreamReadReply = self
            .client
            .xread_options(&["uptime:website"], &[">"], &option)
            .await?;

        for key in reply.keys {
            for id in &key.ids {
                // TODO: Process the message (id.map has the fields)
                println!("Got message: {}", id.id);

                // ACK so Redis doesn't redeliver
                let _: i64 = self.client
                    .xack("uptime:website", "india", &[&id.id])
                    .await?;
            }
        }

        Ok(String::from("Success"))
    }
}
