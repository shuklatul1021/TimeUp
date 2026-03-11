use redis::{Client, RedisResult};
use redisstream::redis::RedisStream;


#[tokio::main]
async fn main() -> RedisResult<()> {
    let producer_client = RedisStream::new().await?;
    
    Ok(())
}