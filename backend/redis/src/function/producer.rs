use crate::redis::RedisStream;


impl RedisStream {
    pub async fn produce(&mut self) -> Result<String, redis::RedisError> {
        let website = self.db.get_website()?;
        Ok(website.id)
    }
    
}