use redis::RedisResult;
use redisstream::redis::RedisStream;
pub mod request;

async fn run_worker(client: &mut RedisStream) -> RedisResult<()> {
    loop {
        println!("Waiting for new messages...");
        let works = client.x_read_group_website().await?;
        println!("Received work: {:?}", works);

        for work in works.keys {
            for entry in work.ids {
                let stream_id = entry.id;
                let task = entry.map;
                println!("Processing task with stream ID: {}", stream_id);
                println!("Task details: {:?}", task);
                let website_url = task.get("url");
                match website_url {
                    Some(url) => {
                        println!("Processing website URL: {:?}", url);
                        let request_result = reqwest::Client::new()
                            .get(url)
                            .send()
                            .await;

                    }
                    None => {
                        eprintln!("URL field missing in task with stream ID: {}", stream_id);
                    }
                }

            }
        }


    }
}

#[tokio::main]
async fn main() -> RedisResult<()> {
    let producer_client = RedisStream::new().await;

    match producer_client {
        Ok(mut client) => {
            println!("Connected to Redis Stream successfully!");
            client.create_consumer_group().await?;
            println!("Consumer group ready.");
            run_worker(&mut client).await?;
        }
        Err(e) => {
            eprintln!("Failed to connect to Redis Stream: {}", e);
            return Err(e);
        }
    }
    Ok(())
}
