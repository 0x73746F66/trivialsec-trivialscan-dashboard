data "terraform_remote_state" "prod_full_report_trigger" {
  backend = "s3"
  config = {
    bucket      = "stateful-trivialsec"
    key         = "terraform/trivialscan-full-report-trigger"
    region      = "ap-southeast-2"
  }
}
data "terraform_remote_state" "dev_full_report_trigger" {
  backend = "s3"
  config = {
    bucket      = "stateful-trivialsec"
    key         = "terraform/dev/trivialscan-full-report-trigger"
    region      = "ap-southeast-2"
  }
}
data "terraform_remote_state" "prod_lambda_api" {
  backend = "s3"
  config = {
    bucket      = "stateful-trivialsec"
    key         = "terraform/trivialscan-lambda"
    region      = "ap-southeast-2"
  }
}
data "terraform_remote_state" "dev_lambda_api" {
  backend = "s3"
  config = {
    bucket      = "stateful-trivialsec"
    key         = "terraform/dev/trivialscan-lambda"
    region      = "ap-southeast-2"
  }
}
data "terraform_remote_state" "prod_scanner_ondemand" {
  backend = "s3"
  config = {
    bucket      = "stateful-trivialsec"
    key         = "terraform/trivialscan-on-demand"
    region      = "ap-southeast-2"
  }
}
data "terraform_remote_state" "dev_scanner_ondemand" {
  backend = "s3"
  config = {
    bucket      = "stateful-trivialsec"
    key         = "terraform/dev/trivialscan-on-demand"
    region      = "ap-southeast-2"
  }
}
