use redis::{Client, RedisError, aio::MultiplexedConnection};

pub struct RedisStream {
    pub client: MultiplexedConnection
}

impl RedisStream {
    pub async fn new() -> Result<Self, RedisError> {
        let config  = Client::open("redis://localhost:6379/")?;
        let client = config.get_multiplexed_async_connection().await?;
    
        Ok(Self { client })
    }
}