use redis::{RedisResult};
use redisstream::redis::RedisStream;


#[tokio::main]
async fn main() -> RedisResult<()> {
    let mut producer_client = RedisStream::new().await?;

    producer_client.create_consumer_group().await?;
    
    loop {
        producer_client.x_read_group_website().await?;
    }
}