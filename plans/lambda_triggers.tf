resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.trivialscan_store_bucket.id

  lambda_function {
    lambda_function_arn = data.terraform_remote_state.prod_summaries.outputs.trivialscan_summaries_arn
    events              = [
      "s3:ObjectCreated:*",
      "s3:ObjectRemoved:*",
    ]
    filter_prefix       = "Prod/accounts/"
    filter_suffix       = "summary.json"
  }

  lambda_function {
    lambda_function_arn = data.terraform_remote_state.dev_summaries.outputs.trivialscan_summaries_arn
    events              = [
      "s3:ObjectCreated:*",
      "s3:ObjectRemoved:*",
    ]
    filter_prefix       = "Dev/accounts/"
    filter_suffix       = "summary.json"
  }

  lambda_function {
    lambda_function_arn = data.terraform_remote_state.prod_dashboard_compliance_graphs.outputs.dashboard_compliance_graphs_arn
    events              = [
      "s3:ObjectCreated:*",
      "s3:ObjectRemoved:*",
    ]
    filter_prefix       = "Prod/accounts/"
    filter_suffix       = "full-report.json"
  }

  lambda_function {
    lambda_function_arn = data.terraform_remote_state.dev_dashboard_compliance_graphs.outputs.dashboard_compliance_graphs_arn
    events              = [
      "s3:ObjectCreated:*",
      "s3:ObjectRemoved:*",
    ]
    filter_prefix       = "Dev/accounts/"
    filter_suffix       = "full-report.json"
  }
}
