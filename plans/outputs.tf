output "trivialscan_archive_bucket" {
  value = aws_s3_bucket.trivialscan_archive_bucket.id
}

output "cloudfront_trivialscan_dashboard" {
  value = aws_cloudfront_distribution.trivialscan_dashboard.id
}

output "trivialscan_dashboard_bucket" {
  value = aws_s3_bucket.trivialscan_dashboard.id
}

output "trivialscan_store_bucket" {
  value = aws_s3_bucket.trivialscan_store_bucket.id
}
