use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::{Deserialize, Serialize};

pub async fn process_data(Json(request): Json<DataRequest>) -> impl axum::response::IntoResponse {
    // Calculate sums and return response
    let mut string_len = 0;
    let mut int_len = 0;

    for item in request.0.iter() {
        if let Some(s) = item.as_str() {
            string_len += s.len();
        } else if let Some(n) = item.as_i64() {
            int_len += n.to_string().len();
        }
    }

    let response = DataResponse { "string_len":string_len, "int_len":int_len };
    (StatusCode::OK, Json(response))
}

#[derive(Deserialize)]
pub struct DataRequest {
    // Add any fields here
}

#[derive(Serialize)]
pub struct DataResponse {
    // Add any fields here
}
