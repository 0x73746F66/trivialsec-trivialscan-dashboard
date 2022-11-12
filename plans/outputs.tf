output "trivialscan_archive_bucket" {
  value = aws_s3_bucket.trivialscan_archive_bucket[*].id
}

output "cloudfront_trivialscan_dashboard" {
  value = aws_cloudfront_distribution.trivialscan_dashboard.id
}

output "trivialscan_dashboard_bucket" {
  value = aws_s3_bucket.trivialscan_dashboard.id
}

output "trivialscan_store_bucket" {
  value = aws_s3_bucket.trivialscan_store_bucket[*].id
}

output "api_function_url" {
  value = var.app_env != "Prod" ? data.terraform_remote_state.dev_lambda_api.outputs.function_url : data.terraform_remote_state.prod_lambda_api.outputs.function_url
}
