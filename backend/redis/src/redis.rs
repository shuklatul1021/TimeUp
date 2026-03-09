use redis::{AsyncCommands, Client, Commands, RedisError, aio::MultiplexedConnection};
use store::store::Store;

pub struct RedisStream {
    pub client: MultiplexedConnection,
    pub db: Store,
}

impl RedisStream {
    pub async fn new() -> Result<Self, RedisError> {
        let config  = Client::open("redis://127.0.0.1:6379/")?;
        let mut client = config.get_multiplexed_async_connection().await?;
        let db = Store::default().unwrap();

        Ok(Self { client , db })
    }
}