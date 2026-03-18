use std::time::Instant;

use redis::RedisResult;
use redisstream::redis::RedisStream;
use store::model::website::WebsiteStatus;
use store::store::Store;
pub mod request;

async fn run_worker(client: &mut RedisStream, db_client: &mut Store) -> RedisResult<()> {
    loop {
        println!("Waiting for new messages...");
        let works = client.x_read_group_website().await?;

        for work in works.keys {
            for entry in work.ids {
                let stream_id = entry.id;
                let task = entry.map;
                println!("Processing task with stream ID: {}", stream_id);
                println!("Task details: {:?}", task);
                let website_url = task.get("url");
                let website_id = task.get("id");
                match (website_url, website_id) {
                    (Some(url), Some(web_id)) => {
                        let url_str: String = redis::from_redis_value(url)?;
                        let id_str: String = redis::from_redis_value(web_id)?;
                        println!("Processing website URL: {:?}", url_str);
                        let start = Instant::now();
                        let request_result = reqwest::Client::new().get(&url_str).send().await;
                        let status = match request_result {
                            Ok(response) => {
                                let status = if response.status().is_success() {
                                    WebsiteStatus::Up
                                } else {
                                    WebsiteStatus::Down
                                };
                                let _body = response.text().await;
                                status
                            }
                            Err(e) => {
                                eprintln!("Error occurred while fetching website: {}", e);
                                WebsiteStatus::Down
                            }
                        };

                        let duration = start.elapsed();
                        let duration_ms = duration.as_millis().min(i32::MAX as u128) as i32;
                        let region = String::from("c7f07ba3-e94d-47cd-8428-dcc35e1f659c");
                        let update_db =
                            db_client.add_website_tick(id_str, status, duration_ms, region);

                        if let Err(e) = update_db {
                            eprintln!("Error updating website tick in DB: {}", e);
                        }

                        let _ack = client.x_ack(stream_id).await;
                        println!("Time elapsed: {} ms", duration_ms);
                    }
                    _ => {
                        eprintln!(
                            "URL or ID field missing in task with stream ID: {}",
                            stream_id
                        );
                    }
                }
            }
        }
    }
}

#[tokio::main]
async fn main() -> RedisResult<()> {
    let producer_client = RedisStream::new().await;
    let db_client = Store::default();
    match db_client {
        Ok(mut e) => match producer_client {
            Ok(mut client) => {
                println!("Connected to Redis Stream successfully!");
                client.create_consumer_group().await?;
                println!("Consumer group ready.");
                run_worker(&mut client, &mut e).await?;
            }
            Err(e) => {
                eprintln!("Failed to connect to Redis Stream: {}", e);
                return Err(e);
            }
        },
        Err(e) => {
            eprintln!("Failed to connect to DB: {}", e);
        }
    }
    Ok(())
}
