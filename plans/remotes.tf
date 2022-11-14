data "terraform_remote_state" "prod_dashboard_compliance_graphs" {
  backend = "s3"
  config = {
    bucket      = "stateful-trivialsec"
    key         = "terraform/trivialscan-dashboard-compliance-graphs"
    region      = "ap-southeast-2"
  }
}
data "terraform_remote_state" "dev_dashboard_compliance_graphs" {
  backend = "s3"
  config = {
    bucket      = "stateful-trivialsec"
    key         = "terraform/dev/trivialscan-dashboard-compliance-graphs"
    region      = "ap-southeast-2"
  }
}
data "terraform_remote_state" "prod_summaries" {
  backend = "s3"
  config = {
    bucket      = "stateful-trivialsec"
    key         = "terraform/trivialscan-summaries"
    region      = "ap-southeast-2"
  }
}
data "terraform_remote_state" "dev_summaries" {
  backend = "s3"
  config = {
    bucket      = "stateful-trivialsec"
    key         = "terraform/dev/trivialscan-summaries"
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
