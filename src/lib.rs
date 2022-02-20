use js_sys::Number;
use wasm_bindgen::prelude::wasm_bindgen;

mod utils;
mod life;
mod pitch;

#[wasm_bindgen(js_name = "testAdd")]
pub fn test_add(x: Number, y: Number) -> Number {
    x + y
}

