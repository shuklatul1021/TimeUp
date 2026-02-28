use diesel::Connection;


pub struct Store{
    conn :  Connection
}
//Constructor for Store
impl Default for Store{
    fn default() -> Self {
        Self {
            conn
        }
    }
}
//Implementation of Store
impl Store {
    pub fn create(&self) {

    }
    pub fn update(&self) {

    }
}