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
