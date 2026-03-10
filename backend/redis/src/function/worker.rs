use redis::RedisError;
use store::model::website::Website;

use crate::redis::RedisStream;


impl RedisStream {
    pub async fn x_read_group(
        &mut self,
        websites : Vec<Website> 
    ) -> Result<String, RedisError> {
        let _ : () = self.client.xreadgroup(
            "my_group",
            "worker_1",
            &[("my_stream", ">")],
            None,
        ).await?;

        Ok(String::from("Success"))
    }
    
}