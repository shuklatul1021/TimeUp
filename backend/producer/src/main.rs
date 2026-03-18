use redis::RedisError;
use redisstream::redis::RedisStream;
use std::time::Duration;
use store::{model::website::Website, store::Store};
use tokio::time;

async fn producer(client: &mut RedisStream, websites: &[Website]) -> Result<String, RedisError> {
    client.x_add_bulk(websites).await
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut producer_client = RedisStream::new().await?;
    let mut db_client = Store::default()?;
    let websites = db_client.fetch_all_websites()?;
    let mut interval = time::interval(Duration::from_secs(160));
    for web in websites.iter() {
        println!("Fetched website from DB: {}", web.url);
    }
    interval.tick().await; // Skip the first immediate tick
    loop {
        print!("Producing data to Redis Stream...");
        interval.tick().await;
        producer(&mut producer_client, &websites).await?;
    }
}
