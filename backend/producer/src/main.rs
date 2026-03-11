
use redis::RedisResult;
use redisstream::redis::RedisStream;
use store::{model::website::Website, store::Store};
use std::time::Duration;
use tokio::{spawn, time};

async fn producer(client : RedisStream , websites: Vec<Website>){
    let publisher = client.x_add_bulk(websites).await?;
}

#[tokio::main]
async fn main() -> RedisResult<()> {
    let producer_client = RedisStream::new().await?;
    let db_client = Store::default()?;
    let websites = db_client.fetch_all_websites()?;
    spawn(async move {
        let mut interval = time::interval(Duration::from_secs(1));
        interval.tick().await; // Skip the first immediate tick
        loop {
            interval.tick().await; 
            producer(producer_client ,websites);
        }
    });

    Ok(())
}
